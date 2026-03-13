# Examples

Usage examples for XForce Terminal Contracts.

## Files

- `cli.rs` - CLI client for interacting with the program on devnet
- `terminal_integration.rs` - Integration with XForce Terminal backend

## Running Examples

### CLI Client

```bash
cd examples
cargo run --example cli -- --help

# Get program info
cargo run --example cli -- info

# View a transaction
cargo run --example cli -- tx <SIGNATURE>

# Get devnet airdrop info
cargo run --example cli -- airdrop --amount 2

# Prepare a batch swap (shows parameters)
cargo run --example cli -- batch-swap \
  --input-mint So11111111111111111111111111111111111111112 \
  --output-mint EPjFWdd5AufqSSCwMBC33gHc4dqoY3SJnf4jW9NMSk6Q \
  --amount 1000000000 \
  --min-output 90000000
```

### Terminal Integration

```bash
cd examples
cargo run --example terminal_integration
```

## Creating New Examples

1. Add file to `examples/`
2. Update `Cargo.toml` with example target
3. Document the example purpose
