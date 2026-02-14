import datetime
from tasks import cpu_bound

def main():
    async_result_1 = cpu_bound.delay(1, 2)
    async_result_2 = cpu_bound.delay(1, 3)
    async_result_3 = cpu_bound.delay(1, 4)
    async_result_4 = cpu_bound.delay(1, 5)
    print( async_result_1.get() , async_result_2.get() , async_result_3.get() , async_result_4.get())

start = datetime.datetime.now()
main()
end = datetime.datetime.now()
print(f"Time spent: {end - start}")