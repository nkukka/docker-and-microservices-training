FROM ubuntu:16.04

RUN apt update
RUN apt install -y python2.7 python-pip python-setuptools firefox xvfb wget

RUN pip install --upgrade pip
RUN pip install robotframework robotframework-xvfb robotframework-selenium2library xvfbwrapper

RUN wget --quiet https://github.com/mozilla/geckodriver/releases/download/v0.14.0/geckodriver-v0.14.0-linux64.tar.gz
RUN tar xf geckodriver-v0.14.0-linux64.tar.gz
RUN mkdir -p /opt/geckodriver
RUN cp -f geckodriver /opt/geckodriver
RUN ln -sf /opt/geckodriver/geckodriver /usr/bin/geckodriver

ENTRYPOINT ["robot"]
