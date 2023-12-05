FROM prefecthq/prefect:2.7.0-python3.10

WORKDIR /app

COPY *.* ./
COPY prefect ./prefect

WORKDIR /app/prefect

RUN pip install -r requirements.txt

WORKDIR /app/prefect/flows

