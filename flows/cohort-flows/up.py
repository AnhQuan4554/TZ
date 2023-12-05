import os
import time
import requests
from flows.main import main_flow
from prefect.deployments import Deployment
from watchdog.observers import Observer
import watchdog.events

client_name = os.environ['CLIENT_NAME']
prefect_url = os.environ['PREFECT_API_URL']


def prefect_server_alive():
    try:
        response = requests.head(prefect_url)
        if response.status_code == 200:
            return True
        else:
            return False
    except requests.ConnectionError as e:
        return False


retry_counter = 0
while not prefect_server_alive() and retry_counter < 10:
    print("Waiting for Prefect server to be available")
    time.sleep(1)
    retry_counter += 1

print("Prefect server is available")


def update_deployment():
    print('Updating Deployment...')
    deployment = Deployment.build_from_flow(
        flow=main_flow,
        name='default',
        version=1,
        work_queue_name=client_name,
    )

    deployment.apply()


class Handler(watchdog.events.PatternMatchingEventHandler):
    def __init__(self):
        watchdog.events.PatternMatchingEventHandler.__init__(self, patterns=['*.py'],
                                                             ignore_directories=True, case_sensitive=True)

    def on_created(self, event):
        print("Watchdog received created event - % s." % event.src_path)
        update_deployment()

    def on_modified(self, event):
        print("Watchdog received modified event - % s." % event.src_path)
        update_deployment()


if __name__ == "__main__":

    update_deployment()
    observer = Observer()
    observer.schedule(Handler(), './flows', recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    finally:
        observer.stop()
        observer.join()
