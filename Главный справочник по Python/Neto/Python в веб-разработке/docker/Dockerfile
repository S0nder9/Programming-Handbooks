FROM python:3.7-alpine
WORKDIR /code
ENV FLASK APP=app-Dy
ENV FLASK RUN HOST 0.0.0.0
RUN apk add-no-cache gee must-dev linux-neaders
COPY requirements.txt requirements.txt
RUN pip install requirements.tat
EXPOSE 5000
COPY . .

CMD ["flask", "run"]