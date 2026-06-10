Why we use Redis for blacklisting:

it has a 20x throughput compared to mongodb so much much faster

Why we cant use redis as primary database :

Redis stores data in RAM, so using it as the primary database for large applications becomes very expensive and may risk data loss if persistence is not configured properly.
Redis stores data in a key-value format, so complex SQL queries, joins, and relational operations cannot be performed easily like in databases such as MySQL or PostgreSQL.