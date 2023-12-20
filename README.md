# TK Backend Recipe Exercise

### Archie Ferguson

# Installation

To install, clone this repo and navigate into the root directory of it _(the directory that contains `manage.py` & `requirements.txt`)_

Next, you want to install the requirements into your environment _(Virtual environment is recommended, this project was built using Python 3.9.9)_

```
pip install -r requirements.txt
```

Now you should be able to start the Django server using

```
python manage.py runserver
```

Test away...

# Testing & Coverage

There are 17 unit tests providing 100% code coverage _(excluding `manage.py`)_.

To run the tests through django, navigate to `project_dir/` in your terminal, then run

```
python manage.py test
```

To view the code coverage you can use the `coverage` package, ensure it is installed with

```
pip install coverage
```

Then to run the tests with coverage, run

```
coverage run manage.py test
```

Now to view the results

```
coverage report
```

Alternatively, you can use `coverage lcov` or `coverage html` for other presentation methods.

> If you're using [this package](https://marketplace.visualstudio.com/items?itemName=ryanluker.vscode-coverage-gutters) to view code coverage in VSCode, you will need to output the coverage in lcov, and change the name of the output file to `lcov.info`
