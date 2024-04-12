# Source ref : https://raspberry-lab.fr/Composants/Module-L298N-controleur-moteur-Raspberry-Francais/?repID=481

# Lien intéressant : https://www.raspberrypi.com/documentation/computers/raspberry-pi.html

import RPi.GPIO as GPIO

# Definition des pins
M1_EN = 21
M1_IN1 = 20
M1_IN2 = 16

M2_EN = 18
M2_IN1 = 23
M2_IN2 = 24

M3_EN = 26
M3_IN1 = 19
M3_IN2 = 13

M4_EN = 17
M4_IN1 = 22
M4_IN2 = 27

# Tableau afin de regrouper les pins par moteur
Pins = [[M1_EN, M1_IN1, M1_IN2], [M2_EN, M2_IN1, M2_IN2], [M3_EN, M3_IN1, M3_IN2], [M4_EN, M4_IN1, M4_IN2]]

# Démarrage
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(M1_EN, GPIO.OUT)
GPIO.setup(M1_IN1, GPIO.OUT)
GPIO.setup(M1_IN2, GPIO.OUT)

GPIO.setup(M2_EN, GPIO.OUT)
GPIO.setup(M2_IN1, GPIO.OUT)
GPIO.setup(M2_IN2, GPIO.OUT)

GPIO.setup(M3_EN, GPIO.OUT)
GPIO.setup(M3_IN1, GPIO.OUT)
GPIO.setup(M3_IN2, GPIO.OUT)

GPIO.setup(M4_EN, GPIO.OUT)
GPIO.setup(M4_IN1, GPIO.OUT)
GPIO.setup(M4_IN2, GPIO.OUT)

frequence = 100         # À voir avec le moteur
rapportCyclique = 100   # À voir avec le moteur
M1_vitesse = GPIO.PWM(M1_EN, frequence)
M2_vitesse = GPIO.PWM(M2_EN, frequence)
M3_vitesse = GPIO.PWM(M3_EN, frequence)
M4_vitesse = GPIO.PWM(M4_EN, frequence)
M1_vitesse.start(rapportCyclique)
M2_vitesse.start(rapportCyclique)
M3_vitesse.start(rapportCyclique)
M4_vitesse.start(rapportCyclique)

def tournerSens1(moteurNum):
    GPIO.output(Pins[moteurNum - 1][1], GPIO.HIGH)
    GPIO.output(Pins[moteurNum - 1][2], GPIO.LOW)


def tournerSens2(moteurNum):
    GPIO.output(Pins[moteurNum - 1][1], GPIO.LOW)
    GPIO.output(Pins[moteurNum - 1][2], GPIO.HIGH)


def avancer(moteurNum):
    GPIO.output(Pins[moteurNum - 1][1], GPIO.HIGH)
    GPIO.output(Pins[moteurNum - 1][2], GPIO.HIGH)


def arreter(moteurNum):
    GPIO.output(Pins[moteurNum - 1][1], GPIO.LOW)
    GPIO.output(Pins[moteurNum - 1][2], GPIO.LOW)


def avancerTout():
    avancer(1)
    avancer(2)
    avancer(3)
    avancer(4)


def arreterTout():
    arreter(1)
    arreter(2)
    arreter(3)
    arreter(4)
