import os
import sys

current = os.path.dirname(os.path.realpath(__file__))
parentdir = os.path.dirname(current)
sys.path.append(parentdir)
