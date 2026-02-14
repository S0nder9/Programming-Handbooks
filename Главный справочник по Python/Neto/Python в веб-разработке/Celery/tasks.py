import time
import celery

app = celery.Celery(
    broker="redis://127.0.0.1:6379/0", 
    backend="redis://127.0.0.1:6379/1",
    broker_connection_retry_on_startup=True 
)

app.conf.update(
    task_serializer='json',
    result_serializer='json',
    accept_content=['json'],
    timezone='UTC',
    enable_utc=True,
    task_always_eager=False,
    worker_prefetch_multiplier=1,
    task_acks_late=True,
    worker_max_tasks_per_child=1000,
)

@app.task(name="cpu_bound")
def cpu_bound(a, b):
    time.sleep(0.5)
    return a + b
