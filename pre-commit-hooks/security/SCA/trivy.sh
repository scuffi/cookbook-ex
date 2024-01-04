#!/bin/bash

echo -e "\nRunning SCA trivy pre-commit\n"
[[ -f ./requirements.txt  ]] && echo "requirements.txt exists, running trivy" && docker run --rm -v "$PWD":/myapp aquasec/trivy fs myapp/requirements.txt --ignore-unfixed -q --scanners vuln || exit 0
[[ -f ./requirements-dev.txt  ]] && echo "requirements-dev.txt exists, running trivy" && docker run --rm -v "$PWD":/myapp aquasec/trivy fs myapp/requirements-dev.txt --ignore-unfixed -q --scanners vuln || exit 0
[[ -f ./pnpm-lock.yaml  ]] && echo "pnpm-lock.yaml exists, running trivy" && docker run --rm -v "$PWD":/myapp aquasec/trivy fs myapp/pnpm-lock.yaml --ignore-unfixed -q --scanners vuln || exit 0