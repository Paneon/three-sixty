Feature: Admin Page

  Background:
    Given I am logged in to Google
    And I am on the Admin Page

  Scenario:
    When I am on the Admin Page
    Then I see the "Add Team" button

  Scenario:
    When I click the "Add Team" button
    Then I see the Modal open

  Scenario:
    When I click the "Add Team" button
    And I fill out the form:
      | name      |
      | Demo Team |
    Then I can see the new team "Demo Team"

  Scenario:
    When I add a team "Demo Team"
    And I delete the team "Demo Team"
    And I can see a loading bar.

# Extensions
  @WIP
  Scenario:
    When I add a team "Demo Team"
    And I delete the team "Demo Team"
    Then the TeamCard of "Demo Team" will be grayed out
    And I can see a loading bar.