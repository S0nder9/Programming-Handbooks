FROM python:3.9-alpine
RUN apk add --no-cache gcc musl-dev linux-headers

WORKDIR /src
COPY ./requirements.txt ./requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt 

COPY . .

ENV MY_ENV=netology_16_08_25 
EXPOSE 5050 


CMD [ "python3", "-u", "main.py", "--host", "0.0.0.0", "--port", "5050" ] 