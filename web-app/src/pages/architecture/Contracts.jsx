import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';

const Section = ({ title, subtitle, children, delay = 0 }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="mb-12"
    >
        <h2 className="text-3xl font-bold text-white mb-2 font-heading">{title}</h2>
        {subtitle && (
            <p className="text-xl text-gray-400 mb-6 font-sans">{subtitle}</p>
        )}
        <div className="bg-black/40 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
            {children}
        </div>
    </motion.div>
);

export default function ContractsDetails() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl md:text-6xl font-black mb-4 font-heading tracking-tight">
                    <span className="text-red-500">xforce</span>
                    <span className="text-white">-contracts</span>
                </h1>
                <p className="text-xl text-gray-400 font-sans">
                    Solana Smart Contracts with Anchor
                </p>
            </motion.div>

            {/* Overview */}
            <Section title="What is this?" delay={0.1}>
                <p className="text-gray-300 text-lg mb-4 font-sans leading-relaxed">
                    Smart contracts are like <strong className="text-red-400">vending machines</strong> on the blockchain. You put in tokens, select what you want, and the machine automatically gives it to you — no cashier needed. Our contracts specialize in batch token swaps: doing multiple trades in one transaction to save you money on fees.
                </p>
                <p className="text-gray-400 font-sans">
                    Built with <strong className="text-white">Anchor</strong> (a Rust framework for Solana), these contracts handle security validations, slippage protection, and protocol fee management automatically.
                </p>
            </Section>

            {/* Program Declaration */}
            <Section title="Program Structure" subtitle="The Main Entry Point" delay={0.2}>
                <CodeBlock 
                    title="lib.rs — Program Declaration"
                    explanation="This is like the vending machine's control panel. We declare what our program does (batch swaps), set its unique ID on the blockchain (like a serial number), and define the two main operations."
                    language="rust"
                    code={`//! # Batch Swap Router Program
//! A Solana program for batch token swaps with atomic execution.

use anchor_lang::prelude::*;

// Program ID — like a serial number for our vending machine
// This is the devnet deployment address
declare_id!("HS63bw1V1qTM5uWf92q3uaFdqogrc4SN9qUJSR8aqBMx");

#[program]
pub mod batch_swap_router {
    use super::*;

    /// batch_swap: Do multiple trades in one transaction
    /// Think of it like buying a soda, chips, and candy all at once
    pub fn batch_swap(ctx: Context<BatchSwap>, swaps: Vec<SwapParams>) -> Result<()> {
        instructions::batch_swap::handler(ctx, swaps)
    }

    /// execute_swap: Do a single trade
    /// Like buying just one soda
    pub fn execute_swap(
        ctx: Context<ExecuteSwap>,
        amount: u64,
        min_output_amount: u64,
        expected_output: u64,
    ) -> Result<()> {
        instructions::execute_swap::handler(ctx, amount, min_output_amount, expected_output)
    }
}`}
                />
            </Section>

            {/* Batch Swap Handler */}
            <Section title="Batch Swaps" subtitle="Multiple Trades, One Transaction" delay={0.3}>
                <CodeBlock 
                    title="Batch Swap Handler — The Main Logic"
                    explanation="This is the vending machine's internal mechanism. Validates each swap, calculates fees, and emits events. Atomic execution means either ALL trades succeed or NONE do."
                    language="rust"
                    code={`/// Handler for batch swap instruction
/// Max 10 swaps per batch with atomic execution
pub fn handler(ctx: Context<BatchSwap>, swaps: Vec<SwapParams>) -> Result<()> {
    // STEP 1: Validate the batch size
    // Can't do 0 trades, can't do more than 10
    require!(!swaps.is_empty(), ErrorCode::EmptySwaps);
    require!(swaps.len() <= MAX_BATCH_SIZE, ErrorCode::TooManySwaps);
    
    // STEP 2: Validate each individual swap
    for (index, swap) in swaps.iter().enumerate() {
        // Check: Input and output tokens must be different
        assert_not_default(&swap.input_mint)?;
        assert_not_default(&swap.output_mint)?;
        
        // Check: Amount must be reasonable (prevent dust attacks)
        require!(swap.amount >= MIN_SWAP_AMOUNT, ErrorCode::InvalidAmount);
        
        // Check: Can't swap a token for itself
        assert_different_mints(&swap.input_mint, &swap.output_mint)?;
        
        // Check: User must specify minimum output (slippage protection)
        require!(swap.min_output_amount > 0, ErrorCode::InvalidMinOutput);
        
        // Log what we're doing
        msg!("Swap {}: {} tokens from {}", index + 1, swap.amount, swap.input_mint);
    }
    
    // STEP 3: Calculate total fees with safe math
    let mut total_input_amount: u64 = 0;
    let mut total_protocol_fees: u64 = 0;
    
    for swap in &swaps {
        let fee = calculate_protocol_fee(swap.amount)?;
        total_input_amount = total_input_amount.safe_add(swap.amount)?;
        total_protocol_fees = total_protocol_fees.safe_add(fee)?;
    }
    
    // STEP 4: Emit event (like a receipt) for tracking
    emit!(BatchSwapEvent {
        authority: ctx.accounts.authority.key(),
        swap_count: swaps.len() as u8,
        total_input_amount,
        total_protocol_fees,
        timestamp: Clock::get()?.unix_timestamp,
    });
    
    Ok(())
}`}
                />
            </Section>

            {/* Execute Swap */}
            <Section title="Single Swap" subtitle="One Trade at a Time" delay={0.4}>
                <CodeBlock 
                    title="Execute Swap Handler — With CPI"
                    explanation="Handles single trades using CPI (Cross-Program Invocation). Think of CPI like the vending machine calling another vending machine to complete your order."
                    language="rust"
                    code={`/// Single swap with slippage protection and fee distribution
pub fn handler(ctx: Context<ExecuteSwap>, amount: u64, min_output_amount: u64, expected_output: u64) -> Result<()> {
    // SECURITY CHECKS: Who are you? Do you own these tokens?
    assert_signer(ctx.accounts.authority.as_ref())?;
    require!(amount >= MIN_SWAP_AMOUNT, ErrorCode::InvalidAmount);
    
    // Check: Can't swap a token for itself
    assert_different_mints(
        &ctx.accounts.input_token_account.mint, 
        &ctx.accounts.output_token_account.mint
    )?;
    
    // Check: User must actually own the input tokens
    assert_token_account_owner(
        &ctx.accounts.input_token_account, 
        ctx.accounts.authority.key()
    )?;
    
    // Calculate protocol fee (like a service charge)
    let protocol_fee = calculate_protocol_fee(amount)?;
    let swap_amount = amount_after_fee(amount, protocol_fee)?;
    
    // CPI: Call the SPL Token program to do the actual transfer
    // This is like our vending machine calling another machine to dispense tokens
    let transfer_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.input_token_account.to_account_info(),
            to: ctx.accounts.fee_recipient.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        },
    );
    
    // Execute the token transfer
    token::transfer(transfer_ctx, protocol_fee)
        .map_err(|_| ErrorCode::TransferFailed)?;
    
    // SLIPPAGE CHECK: Did we get at least the minimum expected?
    // If prices moved too much, reject the trade
    validate_slippage(expected_output, actual_output, min_output_amount, MAX_SLIPPAGE_BPS)?;
    
    // Emit event: Create a receipt of what happened
    emit!(SwapExecutedEvent {
        authority: ctx.accounts.authority.key(),
        input_amount: amount,
        output_amount: actual_output,
        protocol_fee,
        timestamp: Clock::get()?.unix_timestamp,
    });
    
    Ok(())
}`}
                />
            </Section>

            {/* Security Features */}
            <Section title="Security Features" subtitle="Built-in Protections" delay={0.5}>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-red-400 mb-2">Slippage Protection</h3>
                        <p className="text-gray-400 text-sm">Users specify minimum output amounts. If market moves against them beyond tolerance, trade fails and no funds are lost.</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-red-400 mb-2">Atomic Execution</h3>
                        <p className="text-gray-400 text-sm">All swaps in a batch succeed or fail together. No partial executions leaving users with unwanted token positions.</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-red-400 mb-2">Safe Math</h3>
                        <p className="text-gray-400 text-sm">All calculations use overflow-safe arithmetic. No exploits possible from integer overflow/underflow.</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold text-red-400 mb-2">Owner Validation</h3>
                        <p className="text-gray-400 text-sm">Every transaction verifies the user actually owns the tokens they're trying to trade. No spending other people's funds.</p>
                    </div>
                </div>
            </Section>

            {/* Navigation */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-between items-center mt-12 pt-8 border-t border-gray-800"
            >
                <Link to="/architecture/backend" className="text-gray-400 hover:text-red-400 transition-colors">
                    ← Backend API
                </Link>
                <Link to="/architecture/crypto" className="text-red-400 hover:text-red-300 transition-colors">
                    Next: News Service →
                </Link>
            </motion.div>
        </div>
    );
}
