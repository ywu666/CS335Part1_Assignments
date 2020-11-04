# Department of Mathematics — Web Application
Two new logical sections are required for the Mathematics department's single-page web application: 
- A Courses section that contains a list courses that the department offers.
- An Infographics section that contains just a heading named Infographics — this section will feature future infographics planned to be published by the department. 
- A user should be able to switch between the two sections and viewing a section should only show the information relevant to that section.

End Point for courses: https://api.test.auckland.ac.nz/service/courses/v2/courses?subject=MATHS&year=2020&size=500 
<br> Links to an external site. Include as much relevant course details as you can.

When you are able to successfully display the list of courses, add a further interaction to the courses: when a user selects (clicks/touches) a course, fetch the course timetable and display this to the user. Start with a simple alert to display the information, and come back to look at better ways of presenting this after completing the other sections of this assessment. The course timetable is available from the endpoint: https://api.test.auckland.ac.nz/service/classes/v1/classes?year=2020&subject=MATHS&size=500&catalogNbr={catalogNbr} Links to an external site.   where {catalogNbr} is obtained from the course list. For example, 162 is the catalogNbr for MATHS 162.

## Requirements
You are not allowed to use loops for processing collections of items. Instead, you must use the forEach (Links to an external site.) method of JavaScript arrays.

Please note that you are not allowed to use any libraries or frameworks. Please keep your style (CSS) and script (JS) external. You will be required to submit these as separate files.

Please don't use a CORS proxy when one is not required. Using proxies unnecessarily creates additional latencies and hotspots. There will be penalties if you used one when not required. Hot-linking to resources (such as images and vCards) do not require the use of a CORS proxy. The endpoints to get the list of courses and class schedules do NOT require CORS proxies (why?).

If you need to use a CORS proxy and if you are working on a Windows device, please consider using one on your local machine — a CORS proxy runnable on Windows is available to you.

If you have no access to Windows OS, or if you cannot get your local proxy to work, use one of the CORS proxies provided at:

- https://cws.auckland.ac.nz/cors/CorsProxyService.svc/proxy?url={URL}Links to an external site.
- http://redsox.uoa.auckland.ac.nz/cors/CorsProxyService.svc/proxy?url={URL}Links to an external site.
