# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)


@app.route('/')
@app.route('/index')
def index():
    print('here')
    return render_template('index.html')

@app.route('/comingsoon')
def comingsoon():
    print('here')
    return render_template('comingsoon.html')


@app.route('/loadPrayerTimes')
def loadPrayerTimes():
    print('loadingPrayerTimes')
    with open('prayerTimes.json') as f:
        prayerTimes = json.load(f)
        print(jsonify(prayerTimes))
        print(type(prayerTimes))
        return jsonify(prayerTimes)


