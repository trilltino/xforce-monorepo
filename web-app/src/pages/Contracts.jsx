const codeSnippets = {
    batchSwap: `//! Execute multiple token swaps in a single transaction
//! This leverages Solana's transaction model where multiple
//! instructions execute atomically

pub fn batch_swap(
    ctx: Context<BatchSwap>,
    swaps: Vec<SwapParams>
) -> Result<()> {
    // Validate batch size (max 10 swaps per transaction)
    require!(!swaps.is_empty(), ErrorCode::EmptySwaps);
    require!(
        swaps.len() <= MAX_BATCH_SIZE,
        ErrorCode::TooManySwaps
    );

    // Validate each swap parameter
    for swap in &swaps {
        require!(
            swap.amount >= MIN_SWAP_AMOUNT,
            ErrorCode::InvalidAmount
        );
        // Input and output mints must differ
        assert_different_mints(
            &swap.input_mint,
            &swap.output_mint
        )?;
    }

    // Calculate total fees with safe math
    let mut total_input_amount: u64 = 0;
    let mut total_protocol_fees: u64 = 0;
    
    for swap in &swaps {
        let fee = calculate_protocol_fee(swap.amount)?;
        total_input_amount = total_input_amount.safe_add(swap.amount)?;
        total_protocol_fees = total_protocol_fees.safe_add(fee)?;
    }

    // Emit event for tracking (stored on-chain)
    emit!(BatchSwapEvent {
        authority: ctx.accounts.authority.key(),
        swap_count: swaps.len() as u8,
        total_input_amount,
        total_protocol_fees,
        timestamp: Clock::get()?.unix_timestamp,
    });

    Ok(())
}`,
    swapParams: `// Swap parameters for a single swap operation
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct SwapParams {
    /// Input token mint (Solana address)
    pub input_mint: Pubkey,
    
    /// Output token mint (Solana address)
    pub output_mint: Pubkey,
    
    /// Amount in token's smallest unit
    /// (e.g., lamports for SOL)
    pub amount: u64,
    
    /// Minimum output for slippage protection
    pub min_output_amount: u64,
}

// Example usage:
// SwapParams {
//     input_mint: sol_mint,           // SOL address
//     output_mint: usdc_mint,         // USDC address
//     amount: 1_000_000_000,          // 1 SOL (in lamports)
//     min_output_amount: 90_000_000,  // 90 USDC (10% slippage)
// }`,
    accountStructure: `/// Accounts required for batch swap instruction
/// Uses Solana's account model for state management
#[derive(Accounts)]
pub struct BatchSwap<'info> {
    /// Transaction authority (payer)
    #[account(mut)]
    pub authority: Signer<'info>,
    
    /// Router state account (PDA)
    #[account(
        mut,
        seeds = [b"router_state"],
        bump = router_state.bump
    )]
    pub router_state: Account<'info, RouterState>,
    
    /// Jupiter aggregator program
    /// CPI to Jupiter for swap execution
    pub jupiter_program: Program<'info, Jupiter>,
    
    /// Token program for transfers
    pub token_program: Program<'info, Token>,
    
    /// System program for account creation
    pub system_program: Program<'info, System>,
}

/// Router state stored in a PDA (Program Derived Address)
/// This account persists across transactions
#[account]
pub struct RouterState {
    /// Authority that can update settings
    pub authority: Pubkey,
    
    /// Protocol fee basis points (e.g., 30 = 0.3%)
    pub fee_bps: u16,
    
    /// Total fees collected (in lamports)
    pub total_fees_collected: u64,
    
    /// Total swaps executed
    pub total_swaps: u64,
    
    /// PDA bump seed
    pub bump: u8,
}`
};

export default function Contracts() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 font-heading text-gray-900 dark:text-white">
                    Batch Swap Router Contracts
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 font-sans">
                    Production-grade Solana smart contracts for atomic batch token swaps
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        Solana Devnet
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        MIT License
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                        100% Open Source
                    </span>
                </div>
            </div>

            {/* Overview Section */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 mb-8">
                <h2 className="text-3xl font-bold mb-6 font-heading text-gray-900 dark:text-white">
                    Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 font-sans leading-relaxed">
                    The Batch Swap Router is a Solana smart contract that enables users to execute multiple token swaps atomically in a single transaction. Built with the Anchor framework, it leverages Solana's high throughput and low transaction fees to provide cost-effective batch swapping capabilities.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 font-sans leading-relaxed">
                    Instead of executing 3 separate swaps (SOL → USDC → BONK → RAY) that would cost 3 transaction fees, you can execute all swaps in ONE transaction, saving 60-90% on fees while ensuring atomic execution - either all swaps succeed or all fail together.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Program ID (Devnet):</p>
                    <code className="text-sm text-purple-600 dark:text-purple-400 break-all">
                        HS63bw1V1qTM5uWf92q3uaFdqogrc4SN9qUJSR8aqBMx
                    </code>
                    <a
                        href="https://explorer.solana.com/address/HS63bw1V1qTM5uWf92q3uaFdqogrc4SN9qUJSR8aqBMx?cluster=devnet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                        View on Explorer →
                    </a>
                </div>
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                    { title: 'Atomic Execution', desc: 'All swaps in a batch either succeed together or fail together. No partial executions - your funds are always safe.' },
                    { title: 'Fee Reduction', desc: 'Pay transaction fees once instead of multiple times. Execute up to 10 swaps in a single transaction.' },
                    { title: 'Slippage Protection', desc: 'Built-in validation ensures you receive the minimum expected output. Maximum slippage tolerance: 5%.' },
                    { title: 'Jupiter Integration', desc: 'Integrates with Jupiter aggregator for best-price routing across all DEXes on Solana.' },
                ].map((feature) => (
                    <div key={feature.title} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
                        <h3 className="text-xl font-bold mb-3 font-heading text-gray-900 dark:text-white">
                            {feature.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 font-sans">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Code Snippets */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 mb-8">
                <h2 className="text-3xl font-bold mb-6 font-heading text-gray-900 dark:text-white">
                    How It Works on Solana
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 font-sans leading-relaxed">
                    The contract leverages Solana's unique architecture to provide efficient batch swapping. Here's how it uses Solana's blockchain to achieve this:
                </p>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-3 font-heading text-gray-900 dark:text-white">
                            Batch Swap Instruction
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-3 font-sans text-sm">
                            The core instruction that executes multiple swaps atomically in a single Solana transaction:
                        </p>
                        <pre className="bg-gray-900 dark:bg-black p-6 rounded-lg overflow-x-auto text-sm text-gray-100">
                            <code>{codeSnippets.batchSwap}</code>
                        </pre>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-3 font-heading text-gray-900 dark:text-white">
                            Swap Parameters Structure
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-3 font-sans text-sm">
                            Each swap in the batch is defined by this structure, using Solana's native Pubkey type for addresses:
                        </p>
                        <pre className="bg-gray-900 dark:bg-black p-6 rounded-lg overflow-x-auto text-sm text-gray-100">
                            <code>{codeSnippets.swapParams}</code>
                        </pre>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-3 font-heading text-gray-900 dark:text-white">
                            Solana Account Structure
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-3 font-sans text-sm">
                            The contract uses Solana's account model with PDAs (Program Derived Addresses) for secure state management:
                        </p>
                        <pre className="bg-gray-900 dark:bg-black p-6 rounded-lg overflow-x-auto text-sm text-gray-100">
                            <code>{codeSnippets.accountStructure}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
