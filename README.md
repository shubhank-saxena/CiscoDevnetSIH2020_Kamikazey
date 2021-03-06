# CISCO MID DAY MEAL ANALYTICS SIH 2020
<div align='center'>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/8619923/T1DpAwfh?version=latest#04493690-9e32-4f1c-af9a-f1c2cb6e6013)  

### This is the Team Kamikazey! for the problem statement AM291 Cisco Meraki Mid-Day Meal for Smart India Hackathon 2020

Refer to the following presentation to get the understanding of the workflow and project structure </br>

https://docs.google.com/presentation/d/18b0djYkj5tro1t9USJmXBdODgivMnQn9-xCfCXCkwUY/edit?usp=sharing

</div>
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

## Project Creators ✨

This project was created with the help of these awesome people! :heart:
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://shubhank.codes"><img src="https://avatars3.githubusercontent.com/u/29003047?v=4" width="100px;" alt=""/><br /><sub><b>Shubhank Saxena</b></sub></a><br /><a href="https://github.com/shubhank-saxena/CiscoDevnetSIH2020_Kamikazey/commits?author=shubhank-saxena" title="Code">💻</a> <a href="#design-shubhank-saxena" title="Design">🎨</a></td>
    <td align="center"><a href="https://linkedin.com/in/jsparmani"><img src="https://avatars3.githubusercontent.com/u/41769747?v=4" width="100px;" alt=""/><br /><sub><b>Jay Parmani</b></sub></a><br /><a href="https://github.com/shubhank-saxena/CiscoDevnetSIH2020_Kamikazey/commits?author=jsparmani" title="Code">💻</a> <a href="#design-jsparmani" title="Design">🎨</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/parth-shah-97911416a/"><img src="https://avatars0.githubusercontent.com/u/43181887?v=4" width="100px;" alt=""/><br /><sub><b>Parth Sujalkumar Shah</b></sub></a><br /><a href="https://github.com/shubhank-saxena/CiscoDevnetSIH2020_Kamikazey/commits?author=parthsujalshah" title="Code">💻</a> <a href="#design-parthsujalshah" title="Design">🎨</a></td>
    <td align="center"><a href="https://novoresume.com/a/jaskee789.1"><img src="https://avatars3.githubusercontent.com/u/38110126?v=4" width="100px;" alt=""/><br /><sub><b>Jaskeerat Singh Randhawa</b></sub></a><br /><a href="https://github.com/shubhank-saxena/CiscoDevnetSIH2020_Kamikazey/commits?author=jaskeerat789" title="Code">💻</a> <a href="#design-jaskeerat789" title="Design">🎨</a></td>
    <td align="center"><a href="http://shreyagupta30.github.io"><img src="https://avatars1.githubusercontent.com/u/33135343?v=4" width="100px;" alt=""/><br /><sub><b>Shreya Gupta</b></sub></a><br /><a href="https://github.com/shubhank-saxena/CiscoDevnetSIH2020_Kamikazey/commits?author=shreyagupta30" title="Code">💻</a></td>
    <td align="center"><a href="http://kush-blog.netlify.com"><img src="https://avatars2.githubusercontent.com/u/40840079?v=4" width="100px;" alt=""/><br /><sub><b>Kush Daga</b></sub></a><br /><a href="https://github.com/shubhank-saxena/CiscoDevnetSIH2020_Kamikazey/commits?author=kush-daga" title="Code">💻</a> <a href="#design-kush-daga" title="Design">🎨</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->