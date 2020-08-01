# CISCO MID DAY MEAL ANALYTICS SIH 2020 (BDSM - Bhaiyo Desh Sankat Mai hai)

## Setup and running of project (Backend)

- Fork the repo and clone it.
- The project uses `pipenv` to manage dependencies. So, virtual environment creation will also be handled by pipenv
- Install [Pipenv](https://pypi.org/project/pipenv/)

- Run these commands
```bash
    pipenv install / python3 -m pipenv install
```

- Activate the pipenv enviroment by 
```bash
    pipenv shell / python3 -m pipenv shell
```

- Activate pre-commit hooks after activating the pipenv environment
```bash
    pre-commit install
```

- This completes setup for project requirements and pre-commit test hooks!

- After the above setup, run <br>
  `python manage.py migrate`

- Start the backend dev server
  `python manage.py runserver`
  Runs the backend server at default port `8000`.<br />
  Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

- To exit the `pipenv` virtual environment run `exit`.

## Setup and running of project (Frontend)

- At your root directory run `yarn install` to install all the dependencies
- Start react dev server
- `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Steps to test the final django-react rendered version

- At your root directory run `./scripts/build_local.sh`.
- Start django server
- `python manage.py runserver`
- You should be able to see react working at `localhost:8000`.


#### Note

- As the project uses `pipenv` to manage dependencies, you need to run `pipenv install <package_name>` to install the new package after activating the `pipenv` shell/environment.
- Use only `yarn add package_name` to add new packages to the frontend part.
