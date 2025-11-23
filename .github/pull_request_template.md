name: Pull Request
description: Submit a pull request to contribute to this project
title: "[PR] "
labels: ["enhancement"]

body:
  - type: markdown
    attributes:
      value: |
        Thank you for contributing! Please provide the following information.

  - type: textarea
    id: description
    attributes:
      label: Description
      description: Please describe your changes
      placeholder: What does this PR do?
    validations:
      required: true

  - type: dropdown
    id: pr-type
    attributes:
      label: Type of Change
      multiple: true
      options:
        - Bug fix
        - New feature
        - Breaking change
        - Documentation update
        - Performance improvement
        - Code refactoring
        - Security fix
    validations:
      required: true

  - type: checkboxes
    id: checklist
    attributes:
      label: Checklist
      description: Please confirm the following
      options:
        - label: I have tested my changes locally
          required: true
        - label: I have run `npm run build` successfully
          required: true
        - label: I have verified the theme with Ghost's gscan
          required: true
        - label: I have tested in multiple browsers
          required: false
        - label: I have updated the documentation (if applicable)
          required: false
        - label: My code follows the project's style guidelines
          required: true
        - label: I have added appropriate comments to my code
          required: false
        - label: My changes generate no new warnings or errors
          required: true

  - type: textarea
    id: testing
    attributes:
      label: Testing Instructions
      description: How can reviewers test your changes?
      placeholder: |
        1. Install the theme
        2. Navigate to...
        3. Verify that...

  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots
      description: If applicable, add screenshots showing the changes

  - type: textarea
    id: breaking-changes
    attributes:
      label: Breaking Changes
      description: Does this PR introduce any breaking changes? If yes, please describe them.

  - type: textarea
    id: additional-notes
    attributes:
      label: Additional Notes
      description: Any additional information for reviewers
