###About
When launching the default DevTools network tab you will see that Chrome does in fact have access to WebSocket traffic.
The issue arises when the traffic gets stringified and displayed as unformatted plain text. In cases where your JSON is
several levels deep, this data becomes quite unusable. As result, SocketScoop was built to transform this data into
visual components.

SocketScoop works by injecting content scripts into the DOM in order to monitor all incoming and outgoing traffic.
By monkey patching the existing WebSocket constructor all send, receive, and connect events can be intercepted and
marshaled to the front-end. This process is logically indistinguishable from the native WebSocket itself.  As the data
propagates up to the front-end, its contents are then parsed and transformed into markup, which ultimately gets injected
into the extension panels DOM.

---
###TODO:

**Priority**
  * (**H**): High,
  * (**M**): Medium,
  * (**L**): Low
  
**General**
  * (**H**) Add unit test framework (jasmine)
  * (**H**) Setup test suite with phantomjs support
  * (**M**) Add content length to each request/response
  * (**M**) Add timestamps for the delta between request/response
  * (**H**) Add right aligned button per response that gives the user the ability to copy the formatted value as text
  * (**H**) Add checkbox to ignore heartbeat(ping/pong)

**UI**
  * (**H**) Remove bootstrap and its jquery dependency
  * (**H**) Replace with pure html/css toolbar with centered title and left aligned 'clear requests' button. Replaces bootstrap navbar above
  * (**L**) Add right aligned setting button
      * Functionality (Create dialog or drop down for the options below):
          * Option to ignore ping or any heartbeat related requests.
          * Option to ignore non-JSON based requests/responses. Ping being one of them.
          * Option to show timestamp delta between associated request/response. I need to think about this one..
          * Option to include a regex that ignores certain requests/responses, or only listens to certain requests/responses.