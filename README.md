TODO:

General
  - Add unit test framework (jasmine)
  - Setup test suite with phantomjs support
  
UI
  - Remove bootstrap and its jquery dependency
  - Replace with pure html/css toolbar with centered title and left aligned 'clear requests' button. Replaces bootstrap navbar above
  - Add right aligned setting button

Functionality
    - Settings (Create dialog or dropdown for the options below):
      - Option to ignore ping or any heartbeat related requests.
      - Option to ignore non-JSON based requests/responses. Ping being one of them.
      - Option to show timestamp delta between associated request/response. I need to think about this one..
      - Option to include a regex that ignores certain requests/responses, or only listens to certain requests/responses.
