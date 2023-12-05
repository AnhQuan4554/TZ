## Prefect Flow Code

This directory contains Prefect flow code for each clients.

## Development

#### Prerequisites:

- Python 3

#### Local develoment:

1. Set 'prefect' as the current working directory
2. Set up virtual environment

   ```bash
   python3 -m venv ./venv
   source ./venv/bin/activate
   ```

3. Install dependencies

   ```bash
   pip install -r requirements.txt
   ```

4. Run the flow code of your choice by setting the CLIENT_NAME environment variable.

   ```bash
   export CLIENT_NAME=cohort
   python dev.py
   ```

#### Local test:

1. Set 'prefect' as the current working directory
2. Run the flowing for unit tests:

   ```bash
   python3 -m unittest
   ```
