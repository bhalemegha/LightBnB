SELECT p.city AS city,
	count(r.property_id) AS total_reservations
FROM properties AS p
JOIN reservations AS r
ON p.id = r.property_id
GROUP BY p.city
ORDER BY total_reservations DESC;
