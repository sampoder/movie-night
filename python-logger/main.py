from time import sleep
from pyfiglet import Figlet
import pyqrcode
from airtable import Airtable
import os
from dotenv import load_dotenv
load_dotenv()

thecurrent = 'none'

while True:

    airtable = Airtable(os.getenv("AIRTABLE_BASE"), 'Food')

    currentorder = airtable.get_all(view='Non-claimed', maxRecords=1)

    if thecurrent == currentorder:
        sleep(2)

    elif currentorder == []:

      print(chr(27) + "[2J")

      custom_fig = Figlet()

      ascii_banner = custom_fig.renderText("None Available")

      print(ascii_banner)

    else:
        print(chr(27) + "[2J")

        custom_fig = Figlet()

        ascii_banner = custom_fig.renderText("New Order Coming Up")

        print(ascii_banner)

        url = pyqrcode.create(currentorder[0]['id'])

        print(url.terminal(quiet_zone=1))

        sleep(2)
