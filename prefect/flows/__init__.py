import os
import sys

current = os.path.dirname(os.path.realpath(__file__))
sys.path.append(current)

# Note: this is the workding dir for the Prefect Agent.
# Adding this directory to system path allows running code with dev.py
