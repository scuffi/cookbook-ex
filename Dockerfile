# Use an official Python runtime as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project into the container
COPY . .

# Set the environment variable to make logs immediately visible
ENV PYTHONUNBUFFERED 1 

# Expose the port that the Django application will run on
EXPOSE 8000

# Set the command to run the Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
