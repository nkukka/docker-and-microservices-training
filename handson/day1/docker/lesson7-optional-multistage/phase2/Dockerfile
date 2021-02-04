FROM alpine:latest as builder

RUN apk add  --no-cache  \
            g++ \
            bash

RUN mkdir -p /opt/build
WORKDIR /opt/build
COPY myapp.cpp .

RUN g++ myapp.cpp -o myapp

FROM alpine:latest

RUN apk add --no-cache libstdc++

RUN mkdir -p /opt/build
WORKDIR /opt/build
COPY --from=builder /opt/build/myapp .


ENTRYPOINT ["/opt/build/myapp"]
