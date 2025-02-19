import {
  ACTIONS_CORS_HEADERS, // Importing CORS headers for actions
  ActionGetResponse, // Type for GET response
  ActionPostRequest, // Type for POST request
  ActionPostResponse, // Type for POST response
  createPostResponse, // Function to create a POST response
} from "@solana/actions";
import { ProgramUtils } from "@/app/utils/ProgramUtils";
import {
  Connection, // Class for Solana network connection
  LAMPORTS_PER_SOL, // Constant for lamports to SOL conversion
  PublicKey, // Class for handling public keys
  SystemProgram, // System program for basic transactions
  Transaction, // Class for creating transactions
  clusterApiUrl, // Function to get cluster API URL
} from "@solana/web3.js";

// Add these type definitions
interface ActionInput {
  label: string;
  type: string;
  name: string;
  required?: boolean;
  min?: string;
  step?: string;
  default?: string;
}

interface LinkedAction {
  label: string;
  href: string;
  type: "transaction";
  inputs?: ActionInput[];
}

interface ExtendedActionPostRequest extends ActionPostRequest {
  inputs?: {
    amount?: string;
  };
}

export async function GET(request: Request) {
  console.log("GET request received");
  console.log(request.url);
  let baseUrl: string;
  try {
    baseUrl = request.url;
  } catch (error) {
    baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/donate`;
  }
  
  const url = new URL(baseUrl);
  const addressParam = url.searchParams.get("address");
  
  if (!addressParam) {
    return Response.json(
      { error: "Address is required" },
      { status: 400, headers: ACTIONS_CORS_HEADERS }
    );
  }

  try {
    // Validate the address is a valid PublicKey before proceeding
    let marketAddress: PublicKey;
    try {
      marketAddress = new PublicKey(addressParam);
    } catch (error) {
      return Response.json(
        { error: "Invalid market address format" },
        { status: 400, headers: ACTIONS_CORS_HEADERS }
      );
    }

    // Create a dummy wallet for read-only operations
    const dummyWallet = {
      publicKey: null,
      signTransaction: null,
      signAllTransactions: null,
      payer: null
    };

    const connection = new Connection("http://localhost:8899", "confirmed");
    const programUtils = new ProgramUtils(connection, dummyWallet);
    
    console.log("Trying to get market for address", marketAddress.toBase58());
    const market = await programUtils.getMarket(marketAddress);
    console.log("Market fetched", market);
    if (!market) {
      return Response.json(
        { error: "Market not found" },
        { status: 404, headers: ACTIONS_CORS_HEADERS }
      );
    }

    const payload: ActionGetResponse = {
      icon: "http://localhost:3000"+market.icon || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7dPPWr-BRKzBy_Fig0v_snt-_onQj9Pl5xA&s",
      title: market.title || "AWESOME MARKET",
      description: market.desc || "Developed by the best devs in the world",
      label: "Predict",
      links: {
      actions: [
        {
          type: "transaction",
          label: "$10 on Yes",
          href: `${url.href}?choice=yes&amount=10`,
        },
        {
          type: "transaction",
          label: "$10 on No",
          href: `${url.href}?choice=no&amount=10`,
        },
        {
          type: "transaction",
          label: "Buy Yes",
          href: `${url.href}?choice=yes&amount={amount}`,
          parameters: [
            {
              name: "amount",
              label: `at $${market.yesAmount} a share`,
              type: "number",
              required: true,
            }
          ]
        },
        {
          type: "transaction",
          label: "Buy No",
          href: `${url.href}?choice=no&amount={amount}`,
          parameters: [
            {
              name: "amount",
              label: `at $${market.noAmount} a share`,
              type: "number",
              required: true,
            }
          ]
        }
      ],
    },
    };
    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS, // Set CORS headers
    });
  } catch (error) {
    console.error("Error fetching market:", error);
    return Response.json(
      { error: "Failed to fetch market details" },
      { status: 500, headers: ACTIONS_CORS_HEADERS }
    );
  }
}

export const OPTIONS = GET; // Allow OPTIONS request to use GET handler

export async function POST(request: Request) {
  const body: ExtendedActionPostRequest = await request.json();
  
  let baseUrl: string;
  try {
    baseUrl = request.url;
  } catch (error) {
    baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/donate`;
  }
  
  const url = new URL(baseUrl);
  const addressParam = url.searchParams.get("address");
  const prediction = url.searchParams.get("prediction");
  const amount = body.inputs?.amount ? parseFloat(body.inputs.amount) : 0.1;
  let sender;

  if (!addressParam) {
    return Response.json(
      {
        error: {
          message: "Market address is required",
        },
      },
      {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }

  if (!prediction || !["yes", "no"].includes(prediction.toLowerCase())) {
    return Response.json(
      {
        error: {
          message: "Valid prediction (yes/no) is required",
        },
      },
      {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }

  try {
    sender = new PublicKey(body.account);
  } catch (error) {
    return Response.json(
      {
        error: {
          message: "Invalid account",
        },
      },
      {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }

  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

  try {
    const marketAddress = new PublicKey(addressParam);
    const programUtils = new ProgramUtils(connection, { publicKey: sender });
    
    // Create the prediction transaction
    const transaction = await programUtils.createPredictionTransaction(
      marketAddress,
      prediction.toLowerCase() === "yes",
      amount * LAMPORTS_PER_SOL
    );

    transaction.feePayer = sender;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.lastValidBlockHeight = (
      await connection.getLatestBlockhash()
    ).lastValidBlockHeight;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Transaction created for ${prediction.toUpperCase()} prediction with ${amount} SOL`,
        type: "transaction",
      },
    });
    return new Response(JSON.stringify(payload), {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.error("Error creating prediction transaction:", error);
    return Response.json(
      {
        error: {
          message: "Failed to create prediction transaction",
        },
      },
      {
        status: 500,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
}
