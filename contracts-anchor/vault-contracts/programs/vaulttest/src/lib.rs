use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("42aYWK9kmnZfMMEUUze3SmPu87QYMBdcs1pbJYwkyFi4");

#[program]
pub mod vaulttest {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Vault initialized successfully!");
        msg!("Token account owner PDA: {}", ctx.accounts.token_account_owner_pda.key());
        msg!("Vault token account: {}", ctx.accounts.vault_token_account.key());
        msg!("Token mint: {}", ctx.accounts.mint_of_token_being_sent.key());
    
        Ok(())
    }

    pub fn transfer_in(ctx: Context<TransferAccounts>, amount: u64) -> Result<()> {
        msg!("Token amount transfer in: {}!", amount);

        // Below is the actual instruction that we are going to send to the Token program.
        let cpi_accounts = token::Transfer {
            from: ctx.accounts.sender_token_account.to_account_info(),
            to: ctx.accounts.vault_token_account.to_account_info(),
            authority: ctx.accounts.signer.to_account_info(),
        };

        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
        );

        token::transfer(cpi_ctx, amount)?;

        Ok(())
    }

    pub fn transfer_out(ctx: Context<TransferAccounts>, amount: u64) -> Result<()> {
        msg!("Token amount transfer out: {}!", amount);

        // Below is the actual instruction that we are going to send to the Token program.
        let cpi_accounts = token::Transfer {
            from: ctx.accounts.vault_token_account.to_account_info(),
            to: ctx.accounts.sender_token_account.to_account_info(),
            authority: ctx.accounts.token_account_owner_pda.to_account_info(),
        };

        let bump = ctx.bumps.token_account_owner_pda;
        let seeds = &[b"token_account_owner_pda".as_ref(), &[bump]];
        let signer = &[&seeds[..]];

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
            signer,
        );

        token::transfer(cpi_ctx, amount)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // Derived PDAs
    /// CHECK: This is a PDA that will be a token account authority
    #[account(
        init,
        payer = signer,
        seeds = [b"token_account_owner_pda"],
        bump,
        space = 8
    )]
    pub token_account_owner_pda: AccountInfo<'info>,

    #[account(
        init,
        payer = signer,
        seeds = [b"token_vault", mint_of_token_being_sent.key().as_ref()],
        bump,
        token::mint = mint_of_token_being_sent,
        token::authority = token_account_owner_pda,
    )]
    pub vault_token_account: Account<'info, TokenAccount>,

    pub mint_of_token_being_sent: Account<'info, Mint>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct TransferAccounts<'info> {
    // Derived PDAs
    /// CHECK: This is a PDA that is the token account authority
    #[account(
        seeds = [b"token_account_owner_pda"],
        bump,
    )]
    pub token_account_owner_pda: AccountInfo<'info>,

    #[account(
        mut,
        seeds = [b"token_vault", mint_of_token_being_sent.key().as_ref()],
        bump,
        token::mint = mint_of_token_being_sent,
        token::authority = token_account_owner_pda,
    )]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub sender_token_account: Account<'info, TokenAccount>,

    pub mint_of_token_being_sent: Account<'info, Mint>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}