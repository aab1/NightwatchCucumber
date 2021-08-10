Feature: Search Item on home depot

    @test1
    Scenario: Searching Item on home page

        Given I navigate to home depot website
        When I search "Bulb"
        Then search result is displayed