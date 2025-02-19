module.exports = {

"[externals]/process [external] (process, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("process", () => require("process"));

module.exports = mod;
}}),
"[project]/src/app/solana/idl/fsee.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("{\"address\":\"6FFcK3e2KnkEe1bJF9NEY5QdY2cSP5yRifH8Rwz2mExE\",\"metadata\":{\"name\":\"fsee\",\"version\":\"0.1.0\",\"spec\":\"0.1.0\",\"description\":\"Created with Anchor\"},\"instructions\":[{\"name\":\"add_liquidity\",\"discriminator\":[181,157,89,67,143,182,52,72],\"accounts\":[{\"name\":\"liquidity_provider\",\"writable\":true,\"signer\":true},{\"name\":\"market\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[109,97,114,107,101,116]},{\"kind\":\"account\",\"path\":\"market.creator\",\"account\":\"Market\"},{\"kind\":\"account\",\"path\":\"market.seed\",\"account\":\"Market\"}]}},{\"name\":\"usdc_mint\"},{\"name\":\"usdc_vault\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"usdc_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"liquidity_provider_usdc\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"liquidity_provider\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"usdc_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"yes_mint\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[121,101,115,95,109,105,110,116]},{\"kind\":\"account\",\"path\":\"market\"}]}},{\"name\":\"no_mint\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[110,111,95,109,105,110,116]},{\"kind\":\"account\",\"path\":\"market\"}]}},{\"name\":\"lp_mint\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[108,112,95,109,105,110,116]},{\"kind\":\"account\",\"path\":\"market\"}]}},{\"name\":\"lp_yes_position\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"liquidity_provider\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"yes_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"lp_no_position\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"liquidity_provider\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"no_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"yes_pool\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"yes_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"no_pool\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"no_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"liquidity_provider_lp_ata\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"liquidity_provider\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"lp_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"token_program\",\"address\":\"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA\"},{\"name\":\"system_program\",\"address\":\"11111111111111111111111111111111\"},{\"name\":\"associated_token_program\",\"address\":\"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL\"}],\"args\":[{\"name\":\"amount\",\"type\":\"u64\"}]},{\"name\":\"buy\",\"discriminator\":[102,6,61,18,1,218,235,234],\"accounts\":[{\"name\":\"predictor\",\"writable\":true,\"signer\":true},{\"name\":\"market\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[109,97,114,107,101,116]},{\"kind\":\"account\",\"path\":\"market.creator\",\"account\":\"Market\"},{\"kind\":\"account\",\"path\":\"market.seed\",\"account\":\"Market\"}]}},{\"name\":\"usdc_mint\"},{\"name\":\"usdc_vault\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"usdc_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"predictor_usdc\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"predictor\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"usdc_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"yes_mint\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[121,101,115,95,109,105,110,116]},{\"kind\":\"account\",\"path\":\"market\"}]}},{\"name\":\"no_mint\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[110,111,95,109,105,110,116]},{\"kind\":\"account\",\"path\":\"market\"}]}},{\"name\":\"predictor_yes_ata\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"predictor\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"yes_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"predictor_no_ata\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"predictor\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"no_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"yes_pool\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"yes_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"no_pool\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"no_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"token_program\",\"address\":\"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA\"},{\"name\":\"system_program\",\"address\":\"11111111111111111111111111111111\"},{\"name\":\"associated_token_program\",\"address\":\"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL\"}],\"args\":[{\"name\":\"option\",\"type\":\"bool\"},{\"name\":\"amount\",\"type\":\"u64\"}]},{\"name\":\"initialize_market\",\"discriminator\":[35,35,189,193,155,48,170,203],\"accounts\":[{\"name\":\"creator\",\"writable\":true,\"signer\":true},{\"name\":\"market\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[109,97,114,107,101,116]},{\"kind\":\"account\",\"path\":\"creator\"},{\"kind\":\"arg\",\"path\":\"seed\"}]}},{\"name\":\"usdc_vault\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"usdc_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"usdc_mint\"},{\"name\":\"lp_mint\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[108,112,95,109,105,110,116]},{\"kind\":\"account\",\"path\":\"market\"}]}},{\"name\":\"token_program\",\"address\":\"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA\"},{\"name\":\"system_program\",\"address\":\"11111111111111111111111111111111\"},{\"name\":\"associated_token_program\",\"address\":\"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL\"}],\"args\":[{\"name\":\"seed\",\"type\":\"u64\"},{\"name\":\"description\",\"type\":\"string\"}]},{\"name\":\"initialize_no_mints\",\"discriminator\":[63,240,223,97,247,145,209,164],\"accounts\":[{\"name\":\"creator\",\"writable\":true,\"signer\":true},{\"name\":\"market\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[109,97,114,107,101,116]},{\"kind\":\"account\",\"path\":\"creator\"},{\"kind\":\"account\",\"path\":\"market.seed\",\"account\":\"Market\"}]}},{\"name\":\"no_mint\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[110,111,95,109,105,110,116]},{\"kind\":\"account\",\"path\":\"market\"}]}},{\"name\":\"no_pool\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"no_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"token_program\",\"address\":\"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA\"},{\"name\":\"system_program\",\"address\":\"11111111111111111111111111111111\"},{\"name\":\"associated_token_program\",\"address\":\"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL\"}],\"args\":[]},{\"name\":\"initialize_yes_mints\",\"discriminator\":[204,151,189,232,136,161,179,81],\"accounts\":[{\"name\":\"creator\",\"writable\":true,\"signer\":true},{\"name\":\"market\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[109,97,114,107,101,116]},{\"kind\":\"account\",\"path\":\"creator\"},{\"kind\":\"account\",\"path\":\"market.seed\",\"account\":\"Market\"}]}},{\"name\":\"yes_mint\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[121,101,115,95,109,105,110,116]},{\"kind\":\"account\",\"path\":\"market\"}]}},{\"name\":\"yes_pool\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"yes_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"token_program\",\"address\":\"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA\"},{\"name\":\"system_program\",\"address\":\"11111111111111111111111111111111\"},{\"name\":\"associated_token_program\",\"address\":\"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL\"}],\"args\":[]},{\"name\":\"redeem_tokens\",\"discriminator\":[246,98,134,41,152,33,120,69],\"accounts\":[{\"name\":\"predictor\",\"writable\":true,\"signer\":true},{\"name\":\"market\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[109,97,114,107,101,116]},{\"kind\":\"account\",\"path\":\"market.creator\",\"account\":\"Market\"},{\"kind\":\"account\",\"path\":\"market.seed\",\"account\":\"Market\"}]}},{\"name\":\"usdc_mint\"},{\"name\":\"usdc_vault\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"usdc_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"predictor_usdc\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"predictor\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"usdc_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"yes_mint\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[121,101,115,95,109,105,110,116]},{\"kind\":\"account\",\"path\":\"market\"}]}},{\"name\":\"no_mint\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[110,111,95,109,105,110,116]},{\"kind\":\"account\",\"path\":\"market\"}]}},{\"name\":\"predictor_yes_ata\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"predictor\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"yes_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"predictor_no_ata\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"predictor\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"no_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"yes_pool\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"yes_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"no_pool\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"no_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"token_program\",\"address\":\"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA\"},{\"name\":\"system_program\",\"address\":\"11111111111111111111111111111111\"},{\"name\":\"associated_token_program\",\"address\":\"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL\"}],\"args\":[{\"name\":\"yes_tokens\",\"type\":\"u64\"},{\"name\":\"no_tokens\",\"type\":\"u64\"}]},{\"name\":\"remove_liquidity\",\"discriminator\":[80,85,209,72,24,206,177,108],\"accounts\":[{\"name\":\"liquidity_provider\",\"writable\":true,\"signer\":true},{\"name\":\"market\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[109,97,114,107,101,116]},{\"kind\":\"account\",\"path\":\"market.creator\",\"account\":\"Market\"},{\"kind\":\"account\",\"path\":\"market.seed\",\"account\":\"Market\"}]}},{\"name\":\"usdc_mint\"},{\"name\":\"usdc_vault\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"usdc_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"liquidity_provider_usdc\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"liquidity_provider\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"usdc_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"yes_mint\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[121,101,115,95,109,105,110,116]},{\"kind\":\"account\",\"path\":\"market\"}]}},{\"name\":\"no_mint\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[110,111,95,109,105,110,116]},{\"kind\":\"account\",\"path\":\"market\"}]}},{\"name\":\"lp_mint\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[108,112,95,109,105,110,116]},{\"kind\":\"account\",\"path\":\"market\"}]}},{\"name\":\"lp_yes_position\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"liquidity_provider\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"yes_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"lp_no_position\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"liquidity_provider\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"no_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"yes_pool\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"yes_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"no_pool\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"market\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"no_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"liquidity_provider_lp_ata\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"account\",\"path\":\"liquidity_provider\"},{\"kind\":\"const\",\"value\":[6,221,246,225,215,101,161,147,217,203,225,70,206,235,121,172,28,180,133,237,95,91,55,145,58,140,245,133,126,255,0,169]},{\"kind\":\"account\",\"path\":\"lp_mint\"}],\"program\":{\"kind\":\"const\",\"value\":[140,151,37,143,78,36,137,241,187,61,16,41,20,142,13,131,11,90,19,153,218,255,16,132,4,142,123,216,219,233,248,89]}}},{\"name\":\"token_program\",\"address\":\"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA\"},{\"name\":\"system_program\",\"address\":\"11111111111111111111111111111111\"},{\"name\":\"associated_token_program\",\"address\":\"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL\"}],\"args\":[{\"name\":\"amount\",\"type\":\"u64\"}]},{\"name\":\"resolve_market\",\"discriminator\":[155,23,80,173,46,74,23,239],\"accounts\":[{\"name\":\"predictor\",\"writable\":true,\"signer\":true},{\"name\":\"market\",\"writable\":true,\"pda\":{\"seeds\":[{\"kind\":\"const\",\"value\":[109,97,114,107,101,116]},{\"kind\":\"account\",\"path\":\"market.creator\",\"account\":\"Market\"},{\"kind\":\"account\",\"path\":\"market.seed\",\"account\":\"Market\"}]}}],\"args\":[{\"name\":\"outcome\",\"type\":\"bool\"}]}],\"accounts\":[{\"name\":\"Market\",\"discriminator\":[219,190,213,55,0,227,198,154]}],\"errors\":[{\"code\":6000,\"name\":\"MarketFrozen\",\"msg\":\"Market is frozen\"},{\"code\":6001,\"name\":\"MarketResolved\",\"msg\":\"Market is already resolved\"},{\"code\":6002,\"name\":\"InvalidAmount\",\"msg\":\"Invalid amount\"},{\"code\":6003,\"name\":\"MathOverflow\",\"msg\":\"Math overflow occurred\"},{\"code\":6004,\"name\":\"MarketNotResolved\",\"msg\":\"Market is not resolved\"},{\"code\":6005,\"name\":\"MarketNotFrozen\",\"msg\":\"Market is not frozen\"},{\"code\":6006,\"name\":\"MarketNotActive\",\"msg\":\"Market is not active\"},{\"code\":6007,\"name\":\"InsufficientLiquidityShares\",\"msg\":\"Insufficient liquidity shares\"},{\"code\":6008,\"name\":\"ArithmeticError\",\"msg\":\"Arithmetic error\"}],\"types\":[{\"name\":\"Market\",\"type\":{\"kind\":\"struct\",\"fields\":[{\"name\":\"creator\",\"type\":\"pubkey\"},{\"name\":\"seed\",\"type\":\"u64\"},{\"name\":\"yes_mint\",\"type\":\"pubkey\"},{\"name\":\"no_mint\",\"type\":\"pubkey\"},{\"name\":\"lp_mint\",\"type\":\"pubkey\"},{\"name\":\"description\",\"type\":\"string\"},{\"name\":\"frozen\",\"type\":\"bool\"},{\"name\":\"resolved\",\"type\":\"bool\"},{\"name\":\"outcome\",\"type\":{\"option\":\"bool\"}},{\"name\":\"total_liquidity_shares\",\"type\":\"u64\"},{\"name\":\"fee_percentage\",\"type\":\"u16\"},{\"name\":\"market_bump\",\"type\":\"u8\"},{\"name\":\"yes_mint_bump\",\"type\":\"u8\"},{\"name\":\"no_mint_bump\",\"type\":\"u8\"},{\"name\":\"lp_mint_bump\",\"type\":\"u8\"}]}}]}"));}}),
"[project]/src/app/utils/ProgramUtils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "CONFIRM_OPTIONS": (()=>CONFIRM_OPTIONS),
    "ProgramUtils": (()=>ProgramUtils),
    "useProgramUtils": (()=>useProgramUtils)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/web3.js/lib/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$solana$2f$idl$2f$fsee$2e$json__$28$json$29$__ = __turbopack_import__("[project]/src/app/solana/idl/fsee.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@coral-xyz/anchor/dist/esm/provider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@coral-xyz/anchor/dist/esm/program/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_import__("[project]/node_modules/bn.js/lib/bn.js [app-ssr] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/spl-token/lib/esm/state/mint.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$account$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/spl-token/lib/esm/state/account.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/spl-token/lib/esm/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$instructions$2f$associatedTokenAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/spl-token/lib/esm/instructions/associatedTokenAccount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useConnection.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useWallet.js [app-ssr] (ecmascript)");
;
;
;
;
;
const CONFIRM_OPTIONS = {
    commitment: "finalized"
};
class ProgramUtils {
    program;
    provider;
    PRECISION = BigInt(10000);
    constructor(connection, wallet){
        this.provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnchorProvider"](connection, wallet, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnchorProvider"].defaultOptions());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setProvider"])(this.provider);
        const programId = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"](__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$solana$2f$idl$2f$fsee$2e$json__$28$json$29$__["default"].address);
        console.log("Program ID from IDL:", programId.toString());
        this.program = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Program"](__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$solana$2f$idl$2f$fsee$2e$json__$28$json$29$__["default"], this.provider);
    }
    async initializeMarket(seed, title, description, icon) {
        try {
            const descriptionJSON = {
                title: title,
                desc: description,
                icon: icon
            };
            const descriptionString = JSON.stringify(descriptionJSON);
            const seed_bn = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](seed);
            const market = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddressSync([
                Buffer.from("market"),
                this.provider.wallet.publicKey.toBuffer(),
                Buffer.from(seed_bn.toArrayLike(Buffer, "le", 8))
            ], new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"](__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$solana$2f$idl$2f$fsee$2e$json__$28$json$29$__["default"].address))[0];
            const transaction = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Transaction"]();
            const tx_ix1 = await this.program.methods.initializeMarket(seed_bn, descriptionString).accounts({
                creator: this.provider.wallet.publicKey,
                usdcMint: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"](("TURBOPACK compile-time value", "TTixtnUHcNPsQhDVZvBFDiUamVbz1kyM5QnbCmyFtP4"))
            }).instruction();
            const tx_ix2 = await this.program.methods.initializeNoMints().accountsPartial({
                creator: this.provider.wallet.publicKey,
                market: market
            }).instruction();
            const tx_ix3 = await this.program.methods.initializeYesMints().accountsPartial({
                creator: this.provider.wallet.publicKey,
                market: market
            }).instruction();
            transaction.add(tx_ix1, tx_ix2, tx_ix3);
            const hash = await this.provider.sendAll([
                {
                    tx: transaction
                }
            ], {
                commitment: "finalized"
            });
            console.log("Transaction hash:", hash);
            console.log("Market created with address:", market.toBase58());
            console.log("market", await this.getMarket(market));
            return market;
        } catch (error) {
            console.error("Error in initializeMarket:", error);
            throw error;
        }
    }
    async addLiquidity(market, amount) {
        console.log("Adding liquidity to market:", market.toBase58());
        console.log("Amount:", amount);
        console.log("user", this.provider.wallet.publicKey);
        const ata_ixs = await this.createATAs(market, this.provider.wallet.publicKey);
        console.log("ata_ixs", ata_ixs);
        const ix = await this.program.methods.addLiquidity(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](amount)).accountsPartial({
            liquidityProvider: this.provider.wallet.publicKey,
            usdcMint: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"](("TURBOPACK compile-time value", "TTixtnUHcNPsQhDVZvBFDiUamVbz1kyM5QnbCmyFtP4")),
            market: market
        }).instruction();
        const latestBlockhash = await this.provider.connection.getLatestBlockhash();
        // Create a new TransactionMessage with version and compile it to version 0
        const messageV0 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransactionMessage"]({
            payerKey: this.provider.wallet.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [
                ...ata_ixs,
                ix
            ]
        }).compileToV0Message();
        // Create a new VersionedTransacction to support the v0 message
        const transaction = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VersionedTransaction"](messageV0);
        // Send transaction and await for signature
        const signature = await this.provider.sendAll([
            {
                tx: transaction
            }
        ], CONFIRM_OPTIONS);
        console.log("Signature:", signature);
        return signature[0];
    }
    async buy(market, buyingYes, amount) {
        const tx = await this.program.methods.buy(buyingYes, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](amount)).accountsPartial({
            predictor: this.provider.wallet.publicKey,
            usdcMint: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"](("TURBOPACK compile-time value", "TTixtnUHcNPsQhDVZvBFDiUamVbz1kyM5QnbCmyFtP4")),
            market: market
        }).rpc(CONFIRM_OPTIONS);
        console.log("tx", tx);
        return tx;
    }
    async resolveMarket(market, outcome) {
        const tx = await this.program.methods.resolveMarket(outcome).accountsPartial({
            predictor: this.provider.wallet.publicKey,
            market: market
        }).rpc(CONFIRM_OPTIONS);
        console.log("tx", tx);
        return tx;
    }
    async redeemTokens(market, yesAmount, noAmount) {
        const tx = await this.program.methods.redeemTokens(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](yesAmount), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](noAmount)).accountsPartial({
            predictor: this.provider.wallet.publicKey,
            usdcMint: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"](("TURBOPACK compile-time value", "TTixtnUHcNPsQhDVZvBFDiUamVbz1kyM5QnbCmyFtP4")),
            market: market
        }).rpc(CONFIRM_OPTIONS);
        console.log("tx", tx);
        return tx;
    }
    async removeLiquidity(market, amount) {
        const tx = await this.program.methods.removeLiquidity(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](amount)).accountsPartial({
            liquidityProvider: this.provider.wallet.publicKey,
            usdcMint: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"](("TURBOPACK compile-time value", "TTixtnUHcNPsQhDVZvBFDiUamVbz1kyM5QnbCmyFtP4")),
            market: market
        }).rpc(CONFIRM_OPTIONS);
        console.log("tx", tx);
        return tx;
    }
    async createATAs(market, user) {
        const marketAccount = await this.program.account.market.fetch(market);
        const yes_ix = await this.createTokenAccountInstruction(market, user, marketAccount.yesMint);
        const no_ix = await this.createTokenAccountInstruction(market, user, marketAccount.noMint);
        const lp_ix = await this.createTokenAccountInstruction(market, user, marketAccount.lpMint);
        const ixs = [
            yes_ix,
            no_ix,
            lp_ix
        ];
        // Filter out null instructions and match the return type
        return ixs.filter((ix)=>ix !== null);
    }
    async getAtas(market, user) {
        const marketAccount = await this.program.account.market.fetch(market);
        const yesAta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"])(marketAccount.yesMint, user, true);
        const noAta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"])(marketAccount.noMint, user, true);
        const lpAta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"])(marketAccount.lpMint, user, true);
        const usdcAta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"](("TURBOPACK compile-time value", "TTixtnUHcNPsQhDVZvBFDiUamVbz1kyM5QnbCmyFtP4")), user, true);
        return [
            yesAta,
            noAta,
            lpAta,
            usdcAta
        ];
    }
    async createTokenAccountInstruction(market, user, mint) {
        const associatedToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"])(mint, user);
        let account;
        try {
            account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$account$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAccount"])(this.provider.connection, associatedToken);
            return null;
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenAccountNotFoundError"] || error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenInvalidAccountOwnerError"]) {
                try {
                    const ix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$instructions$2f$associatedTokenAccount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createAssociatedTokenAccountInstruction"])(user, associatedToken, user, mint);
                    return ix;
                } catch (error) {
                    throw error;
                }
            } else {
                throw error;
            }
        }
        return account;
    }
    async getMarkets() {
        const markets = await this.program.account.market.all();
        const market_pdas = await Promise.all(markets.map((market)=>market.publicKey));
        const markets_with_data = await Promise.all(market_pdas.map((market)=>this.getMarket(market)));
        return markets_with_data.filter((market)=>market !== null);
    }
    async getPrice(market) {
        const market_account = await this.program.account.market.fetch(market);
        const market_yes_ata = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"])(market_account.yesMint, market, true);
        const market_no_ata = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"])(market_account.noMint, market, true);
        const yes_pool_balance = BigInt((await this.provider.connection.getTokenAccountBalance(market_yes_ata)).value.amount);
        const no_pool_balance = BigInt((await this.provider.connection.getTokenAccountBalance(market_no_ata)).value.amount);
        const prices = await this.calculateOutcomeShares(yes_pool_balance, no_pool_balance);
        return prices;
    }
    async calculateOutcomeShares(yes_pool_balance, no_pool_balance) {
        // Input validation
        if (yes_pool_balance <= BigInt(0) || no_pool_balance <= BigInt(0)) {
            if (yes_pool_balance == BigInt(0) && no_pool_balance == BigInt(0)) {
                return {
                    priceA: 0.5,
                    priceB: 0.5,
                    priceABigInt: BigInt(5000),
                    priceBBigInt: BigInt(5000)
                };
            } else if (yes_pool_balance == BigInt(0)) {
                return {
                    priceA: 0,
                    priceB: 1,
                    priceABigInt: BigInt(0),
                    priceBBigInt: BigInt(10000)
                };
            } else {
                return {
                    priceA: 1,
                    priceB: 0,
                    priceABigInt: BigInt(10000),
                    priceBBigInt: BigInt(0)
                };
            }
        }
        const totalShares = yes_pool_balance + no_pool_balance;
        const priceABigInt = no_pool_balance * this.PRECISION / totalShares;
        const priceBBigInt = yes_pool_balance * this.PRECISION / totalShares;
        const priceA = Number(priceABigInt) / Number(this.PRECISION);
        const priceB = Number(priceBBigInt) / Number(this.PRECISION);
        const sum = priceA + priceB;
        if (Math.abs(sum - 1) > 0.0001) {
            throw new Error('Invalid prices - must sum to 1');
        }
        return {
            priceA,
            priceB,
            priceABigInt,
            priceBBigInt
        };
    }
    async getUserTokenBalances(market, user) {
        try {
            const marketAccount = await this.program.account.market.fetch(market);
            const yesAta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"])(marketAccount.yesMint, user, true);
            const noAta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"])(marketAccount.noMint, user, true);
            const lpAta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$mint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssociatedTokenAddressSync"])(marketAccount.lpMint, user, true);
            const [yesBalance, noBalance, lpBalance] = await Promise.all([
                this.getTokenBalance(yesAta),
                this.getTokenBalance(noAta),
                this.getTokenBalance(lpAta)
            ]);
            return [
                yesBalance,
                noBalance,
                lpBalance
            ];
        } catch (error) {
            console.error("Error getting user token balances:", error);
            return [
                0,
                0,
                0
            ];
        }
    }
    async getTokenBalance(ata) {
        try {
            const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$spl$2d$token$2f$lib$2f$esm$2f$state$2f$account$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAccount"])(this.provider.connection, ata);
            return Number(account.amount);
        } catch (e) {
            return 0;
        }
    }
    async getMarket(marketPda) {
        const market = await this.program.account.market.fetch(marketPda);
        console.log("market", market);
        const description = JSON.parse(market.description);
        const [usdcAta] = await this.getAtas(marketPda, marketPda);
        const usdcBalance = await this.provider.connection.getTokenAccountBalance(usdcAta);
        const prices = await this.getPrice(marketPda);
        let userYesBalance = 0;
        let userNoBalance = 0;
        let userLpBalance = 0;
        if (this.provider.wallet.publicKey) {
            [userYesBalance, userNoBalance, userLpBalance] = await this.getUserTokenBalances(marketPda, this.provider.wallet.publicKey);
        }
        return {
            creator: market.creator,
            title: description.title,
            desc: description.desc,
            icon: description.icon,
            publicKey: marketPda,
            resolved: market.resolved,
            outcome: market.outcome,
            seed: Number(market.seed),
            liquidity: Number(usdcBalance.value.amount),
            yesAmount: prices.priceA,
            noAmount: prices.priceB,
            userYesBalance,
            userNoBalance,
            userLpBalance
        };
    }
}
const useProgramUtils = ()=>{
    const { connection } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnection"])();
    const { publicKey, signTransaction, signAllTransactions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWallet"])();
    if (!publicKey || !signTransaction || !signAllTransactions) {
        return null;
    }
    const wallet = {
        publicKey,
        signTransaction,
        signAllTransactions,
        payer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keypair"].generate()
    };
    return new ProgramUtils(connection, wallet);
};
}}),
"[project]/src/app/components/ShareButton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ShareButton": (()=>ShareButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShareIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShareIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/ShareIcon.js [app-ssr] (ecmascript) <export default as ShareIcon>");
"use client";
;
;
function ShareButton({ marketAddress, className = "" }) {
    const handleShare = ()=>{
        const shareUrl = `https://dial.to/?action=solana-action:http://localhost:3001/api/donate?address=${marketAddress.toString()}`;
        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl);
        // Open in new tab
        window.open(shareUrl, "_blank");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleShare,
        className: `p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white ${className}`,
        title: "Share market",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShareIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShareIcon$3e$__["ShareIcon"], {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/src/app/components/ShareButton.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/ShareButton.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/components/LiveMarketDetailsModal.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "LiveMarketDetailsModal": (()=>LiveMarketDetailsModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$ProgramUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/utils/ProgramUtils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/web3.js/lib/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ShareButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/components/ShareButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useWallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@headlessui/react/dist/components/dialog/dialog.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/ChevronDownIcon.js [app-ssr] (ecmascript) <export default as ChevronDownIcon>");
"use client";
;
;
;
;
;
;
;
;
function LiveMarketDetailsModal({ isOpen, onClose, market }) {
    const [activeAccordion, setActiveAccordion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [predictionAmount, setPredictionAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [liquidityAmount, setLiquidityAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAddingLiquidity, setIsAddingLiquidity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isBuying, setIsBuying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRemovingLiquidity, setIsRemovingLiquidity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const wallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWallet"])();
    const toggleAccordion = (section)=>{
        setActiveAccordion(activeAccordion === section ? null : section);
    };
    const handleAddLiquidity = async ()=>{
        if (!wallet.publicKey) {
            setError("Please connect your wallet first");
            return;
        }
        if (!liquidityAmount || isNaN(Number(liquidityAmount)) || Number(liquidityAmount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }
        setIsAddingLiquidity(true);
        setError(null);
        try {
            const connection = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Connection"](("TURBOPACK compile-time value", "http://localhost:8899") || "https://api.devnet.solana.com");
            const programUtils = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$ProgramUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProgramUtils"](connection, wallet);
            const amount = Number(liquidityAmount);
            const tx = await programUtils.addLiquidity(market.publicKey, amount);
            console.log("Liquidity added successfully. Transaction signature:", tx);
            onClose();
        } catch (err) {
            console.error("Error adding liquidity:", err);
            setError(err instanceof Error ? err.message : "Failed to add liquidity");
        } finally{
            setIsAddingLiquidity(false);
        }
    };
    const handleBuy = async (buyingYes)=>{
        if (!wallet.publicKey) {
            setError("Please connect your wallet first");
            return;
        }
        if (!predictionAmount || isNaN(Number(predictionAmount)) || Number(predictionAmount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }
        setIsBuying(true);
        setError(null);
        try {
            const connection = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Connection"](("TURBOPACK compile-time value", "http://localhost:8899") || "https://api.devnet.solana.com");
            const programUtils = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$ProgramUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProgramUtils"](connection, wallet);
            const amount = Number(predictionAmount);
            const tx = await programUtils.buy(market.publicKey, buyingYes, amount);
            console.log("Buy successful. Transaction signature:", tx);
            onClose();
        } catch (err) {
            console.error("Error buying tokens:", err);
            setError(err instanceof Error ? err.message : "Failed to buy tokens");
        } finally{
            setIsBuying(false);
        }
    };
    const handleRemoveLiquidity = async ()=>{
        if (!wallet.publicKey) {
            setError("Please connect your wallet first");
            return;
        }
        setIsRemovingLiquidity(true);
        setError(null);
        try {
            const connection = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Connection"](("TURBOPACK compile-time value", "http://localhost:8899") || "https://api.devnet.solana.com");
            const programUtils = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$ProgramUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProgramUtils"](connection, wallet);
            const tx = await programUtils.removeLiquidity(market.publicKey, market.userLpBalance || 0);
            console.log("Liquidity removed successfully. Transaction signature:", tx);
            onClose();
        } catch (err) {
            console.error("Error removing liquidity:", err);
            setError(err instanceof Error ? err.message : "Failed to remove liquidity");
        } finally{
            setIsRemovingLiquidity(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
        open: isOpen,
        onClose: onClose,
        className: "relative z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/30 backdrop-blur-sm",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"].Panel, {
                    className: "bg-background rounded-xl w-full max-w-lg relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-4 right-4 z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ShareButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShareButton"], {
                                marketAddress: market.publicKey
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-full h-[200px] rounded-lg overflow-hidden mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: market.icon,
                                            alt: market.title,
                                            className: "absolute inset-0 w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                            lineNumber: 146,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2 flex flex-col gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-green-400",
                                                            children: [
                                                                "YES: ",
                                                                (market.yesAmount * 100).toFixed(2),
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                            lineNumber: 153,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-400",
                                                            children: [
                                                                "NO: ",
                                                                (market.noAmount * 100).toFixed(2),
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                            lineNumber: 156,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-white/80",
                                                    children: [
                                                        "Liquidity Pool: ",
                                                        market.liquidity.toFixed(2),
                                                        " USDC"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                    lineNumber: 145,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$dialog$2f$dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"].Title, {
                                    className: "text-xl font-bold mb-2",
                                    children: market.title
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/60 text-sm mb-6",
                                    children: market.desc
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border border-white/10 rounded-lg overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>toggleAccordion("predict"),
                                                    className: "w-full px-4 py-3 flex justify-between items-center hover:bg-white/5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "Predict"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                                                            className: `w-5 h-5 transition-transform ${activeAccordion === "predict" ? "rotate-180" : ""}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 17
                                                }, this),
                                                activeAccordion === "predict" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 border-t border-white/10",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            value: predictionAmount,
                                                            onChange: (e)=>setPredictionAmount(e.target.value),
                                                            className: "w-full bg-white/5 border-border rounded-lg px-3 py-2 text-sm text-white mb-3",
                                                            placeholder: "Enter amount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleBuy(true),
                                                                    disabled: isBuying,
                                                                    className: "flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-500 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                                                    children: isBuying ? "Processing..." : "YES"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                                    lineNumber: 196,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleBuy(false),
                                                                    disabled: isBuying,
                                                                    className: "flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-500 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                                                    children: isBuying ? "Processing..." : "NO"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                                    lineNumber: 203,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                            lineNumber: 195,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border border-white/10 rounded-lg overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>toggleAccordion("liquidity"),
                                                    className: "w-full px-4 py-3 flex justify-between items-center hover:bg-white/5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "Liquidity"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                            lineNumber: 221,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronDownIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                                                            className: `w-5 h-5 transition-transform ${activeAccordion === "liquidity" ? "rotate-180" : ""}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                            lineNumber: 222,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 17
                                                }, this),
                                                activeAccordion === "liquidity" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 border-t border-white/10",
                                                    children: [
                                                        market.userLpBalance && market.userLpBalance > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-4 p-3 bg-white/5 rounded-lg",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-white/60 mb-1",
                                                                    children: "Your LP Balance:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                                    lineNumber: 233,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-white font-medium",
                                                                    children: [
                                                                        market.userLpBalance.toFixed(2),
                                                                        " LP"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                                    lineNumber: 236,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                            lineNumber: 232,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            value: liquidityAmount,
                                                            onChange: (e)=>setLiquidityAmount(e.target.value),
                                                            className: "w-full bg-white/5 border-border rounded-lg px-3 py-2 text-sm text-white mb-3",
                                                            placeholder: "Enter liquidity amount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                            lineNumber: 243,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: handleAddLiquidity,
                                                            disabled: isAddingLiquidity,
                                                            className: "w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-500 py-2 rounded-lg text-sm font-medium mb-3 disabled:opacity-50 disabled:cursor-not-allowed",
                                                            children: isAddingLiquidity ? "Adding Liquidity..." : "Add Liquidity"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                            lineNumber: 250,
                                                            columnNumber: 21
                                                        }, this),
                                                        market.userLpBalance && market.userLpBalance > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: handleRemoveLiquidity,
                                                            disabled: isRemovingLiquidity,
                                                            className: "w-full bg-red-600/20 hover:bg-red-600/30 text-red-500 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed",
                                                            children: isRemovingLiquidity ? "Removing Liquidity..." : "Remove All Liquidity"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                            lineNumber: 216,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                                    lineNumber: 278,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                    lineNumber: 138,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/LiveMarketDetailsModal.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/components/MarketCard.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MarketCard": (()=>MarketCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function MarketCard({ market, onSelect, renderActions, showPrices }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-input-background rounded-xl p-4 flex flex-col gap-4 group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative pt-[70%] w-full bg-white/5 rounded-lg overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: market.icon,
                        alt: `Market ${market.seed}`,
                        className: "absolute top-0 left-0 w-full h-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/MarketCard.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    showPrices && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2 flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-green-400",
                                        children: [
                                            "YES: ",
                                            (market.yesAmount * 100).toFixed(2),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/MarketCard.tsx",
                                        lineNumber: 28,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-400",
                                        children: [
                                            "NO: ",
                                            (market.noAmount * 100).toFixed(2),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/MarketCard.tsx",
                                        lineNumber: 31,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/MarketCard.tsx",
                                lineNumber: 27,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-white/80",
                                children: [
                                    "Liquidity: ",
                                    market.liquidity.toFixed(2),
                                    " USDC"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/MarketCard.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/MarketCard.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSelect(market),
                        className: "absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20",
                            children: "+"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/MarketCard.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/MarketCard.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/MarketCard.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-medium text-white/90 line-clamp-2",
                        children: market.title
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/MarketCard.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    market.outcome !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mt-1 text-white/60",
                        children: [
                            "Status:",
                            " ",
                            market.outcome === null ? "Active" : market.outcome ? "Resolved: YES" : "Resolved: NO"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/MarketCard.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/MarketCard.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            renderActions && renderActions(market)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/MarketCard.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/hooks/useMarkets.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useMarkets": (()=>useMarkets)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$ProgramUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/utils/ProgramUtils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/web3.js/lib/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useWallet.js [app-ssr] (ecmascript)");
;
;
;
;
function useMarkets(filter) {
    const [markets, setMarkets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const wallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWallet"])();
    const loadMarkets = async ()=>{
        try {
            setLoading(true);
            const connection = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Connection"](("TURBOPACK compile-time value", "http://localhost:8899") || "https://api.devnet.solana.com");
            console.log("Calling hook");
            const programUtils = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$ProgramUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProgramUtils"](connection, wallet);
            const allMarkets = await programUtils.getMarkets();
            const filteredMarkets = filter ? allMarkets.filter(filter) : allMarkets;
            setMarkets(filteredMarkets);
        } catch (err) {
            console.error("Error loading markets:", err);
            setError(err instanceof Error ? err.message : "Failed to load markets");
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadMarkets();
    }, [
        wallet.publicKey
    ]);
    return {
        markets,
        loading,
        error,
        reload: loadMarkets
    };
}
}}),
"[project]/src/app/components/EmptyState.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "EmptyState": (()=>EmptyState)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function EmptyState({ icon, title, description }) {
    const icons = {
        lock: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-8 h-8 text-white/40",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            }, void 0, false, {
                fileName: "[project]/src/app/components/EmptyState.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/EmptyState.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this),
        info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "w-8 h-8 text-white/40",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            }, void 0, false, {
                fileName: "[project]/src/app/components/EmptyState.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/components/EmptyState.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center py-20 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center",
                children: icons[icon]
            }, void 0, false, {
                fileName: "[project]/src/app/components/EmptyState.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-xl font-medium text-white/90 mb-2",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/app/components/EmptyState.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white/60 max-w-sm",
                children: description
            }, void 0, false, {
                fileName: "[project]/src/app/components/EmptyState.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/EmptyState.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/hooks/useBuyMarket.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useBuyMarket": (()=>useBuyMarket)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$ProgramUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/utils/ProgramUtils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/web3.js/lib/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useWallet.js [app-ssr] (ecmascript)");
;
;
;
;
function useBuyMarket() {
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isBuying, setIsBuying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [amounts, setAmounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const wallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWallet"])();
    const handleBuy = async (market, buyingYes)=>{
        if (!wallet.publicKey) {
            setError("Please connect your wallet first");
            return;
        }
        const amount = amounts[market.seed];
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }
        setIsBuying(market.seed);
        setError(null);
        try {
            const connection = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Connection"](("TURBOPACK compile-time value", "http://localhost:8899") || "https://api.devnet.solana.com");
            const programUtils = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$utils$2f$ProgramUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProgramUtils"](connection, wallet);
            const tx = await programUtils.buy(market.publicKey, buyingYes, Number(amount));
            console.log("Buy successful. Transaction signature:", tx);
            // Reset amount after successful purchase
            setAmounts((prev)=>({
                    ...prev,
                    [market.seed]: ""
                }));
        } catch (err) {
            console.error("Error buying tokens:", err);
            setError(err instanceof Error ? err.message : "Failed to buy tokens");
        } finally{
            setIsBuying(null);
        }
    };
    return {
        handleBuy,
        error,
        isBuying,
        amounts,
        setAmounts
    };
}
}}),
"[project]/src/app/markets/live/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Markets)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$LiveMarketDetailsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/components/LiveMarketDetailsModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$MarketCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/components/MarketCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$hooks$2f$useMarkets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/hooks/useMarkets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/components/EmptyState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$hooks$2f$useBuyMarket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/hooks/useBuyMarket.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ShareButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/components/ShareButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@solana/wallet-adapter-react/lib/esm/useWallet.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function Markets() {
    const [selectedMarket, setSelectedMarket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { publicKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWallet"])();
    const { markets, loading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$hooks$2f$useMarkets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMarkets"])((m)=>!m.resolved);
    const { handleBuy, error: buyError, isBuying, amounts, setAmounts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$hooks$2f$useBuyMarket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuyMarket"])();
    const renderMarketActions = (market)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "number",
                    value: amounts[market.seed] || "",
                    onChange: (e)=>setAmounts((prev)=>({
                                ...prev,
                                [market.seed]: e.target.value
                            })),
                    className: "w-full bg-white/5 border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-border",
                    placeholder: "Enter amount"
                }, void 0, false, {
                    fileName: "[project]/src/app/markets/live/page.tsx",
                    lineNumber: 27,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleBuy(market, true),
                            disabled: isBuying === market.seed,
                            className: "flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-500 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                            children: isBuying === market.seed ? "Processing..." : "YES"
                        }, void 0, false, {
                            fileName: "[project]/src/app/markets/live/page.tsx",
                            lineNumber: 37,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleBuy(market, false),
                            disabled: isBuying === market.seed,
                            className: "flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-500 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                            children: isBuying === market.seed ? "Processing..." : "NO"
                        }, void 0, false, {
                            fileName: "[project]/src/app/markets/live/page.tsx",
                            lineNumber: 44,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/markets/live/page.tsx",
                    lineNumber: 36,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true);
    if (!publicKey) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
            icon: "lock",
            title: "Wallet Not Connected",
            description: "Please connect your wallet to view and participate in markets."
        }, void 0, false, {
            fileName: "[project]/src/app/markets/live/page.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this);
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/app/markets/live/page.tsx",
            lineNumber: 66,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-4",
                children: "Markets"
            }, void 0, false, {
                fileName: "[project]/src/app/markets/live/page.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            (error || buyError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm",
                children: error || buyError
            }, void 0, false, {
                fileName: "[project]/src/app/markets/live/page.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this),
            markets.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
                children: markets.map((market)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$MarketCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MarketCard"], {
                                market: market,
                                onSelect: setSelectedMarket,
                                renderActions: ()=>renderMarketActions(market),
                                showPrices: true
                            }, market.seed, false, {
                                fileName: "[project]/src/app/markets/live/page.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-2 right-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$ShareButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShareButton"], {
                                    marketAddress: market.publicKey,
                                    className: "bg-black/30 hover:bg-black/50"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/markets/live/page.tsx",
                                    lineNumber: 90,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/markets/live/page.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/markets/live/page.tsx",
                        lineNumber: 81,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/markets/live/page.tsx",
                lineNumber: 79,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyState"], {
                icon: "info",
                title: "No Markets Available",
                description: "There are currently no live markets available. Check back later or create your own market."
            }, void 0, false, {
                fileName: "[project]/src/app/markets/live/page.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, this),
            selectedMarket && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$LiveMarketDetailsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LiveMarketDetailsModal"], {
                isOpen: !!selectedMarket,
                onClose: ()=>setSelectedMarket(null),
                market: selectedMarket
            }, void 0, false, {
                fileName: "[project]/src/app/markets/live/page.tsx",
                lineNumber: 107,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/markets/live/page.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/markets/live/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__bc6516._.js.map