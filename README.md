TODO:

Priority:
  H: High,
  M: Medium,
  L: Low

General
  -(H)Add unit test framework (jasmine)
  -(H)Setup test suite with phantomjs support
  
UI
  -(L)Remove bootstrap and its jquery dependency
  -(L)Replace with pure html/css toolbar with centered title and left aligned 'clear requests' button. Replaces bootstrap navbar above
  -(L)Add right aligned setting button
      * Functionality (Create dialog or drop down for the options below):
          - Option to ignore ping or any heartbeat related requests.
          - Option to ignore non-JSON based requests/responses. Ping being one of them.
          - Option to show timestamp delta between associated request/response. I need to think about this one..
          - Option to include a regex that ignores certain requests/responses, or only listens to certain requests/responses.
  -(H)Add right aligned button per response that gives the user the ability to copy the formatted value as text
