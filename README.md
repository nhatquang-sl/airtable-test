# Solution
For the assignment, I came up with two solutions:

- **Solution 1**: The front-end will make a request to the back-end server to retrieve data. The back-end server will then gather the data by calling a 3rd-party API and aggregate it before sending it back to the front-end.

- **Solution 2**: This solution is more complex and involves using workers to periodically download and store data from the 3rd-party in our own database. Each time the front-end makes a request, the back-end server will retrieve the data from our database and send it back to the front-end. The main advantage of this solution is that we can schedule the workers to run at specific times or on demand, ensuring that the data is always up-to-date.

After careful consideration, I have decided to implement Solution 2 as it offers a more comprehensive and efficient approach to managing the data.
