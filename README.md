# vicky-carb-tester

## Email automation utility

`email_automation.py` is a lightweight CLI for sending plain-text emails (with
optional templates, attachments, CC/BCC lists, and dry-run previews) via any
SMTP server.

### Prerequisites
- Python 3.10+ (standard library only; no external dependencies)
- SMTP credentials (for Gmail use an [App Password](https://support.google.com/accounts/answer/6010255) and enable IMAP/SMTP)

### Basic usage
```bash
export SMTP_PASS="app password or token"
python email_automation.py \
  --smtp-server smtp.gmail.com \
  --smtp-port 465 \
  --use-ssl \
  --username you@example.com \
  --password-env SMTP_PASS \
  --from you@example.com \
  --to teammate@example.com \
  --subject "Nightly report" \
  --body-file templates/report.txt \
  --context release=2024.12 build=42 \
  --attachment artifacts/report.pdf
```

### Key flags
- `--template` renders a text template using `str.format` with data from
  `--context` (`key=value` pairs) and/or `--context-file` (JSON object).
- `--dry-run` prints the rendered message metadata instead of connecting to SMTP.
- `--use-ssl` and `--use-starttls` control how TLS is negotiated (choose one).
- `--attachment` accepts multiple file paths in a single invocation.

Run `python email_automation.py --help` to see every option.