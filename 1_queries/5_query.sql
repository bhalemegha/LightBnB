SELECT r.*, p.*, avg(pr.rating) as average_rating
FROM properties AS p
JOIN property_reviews AS pr
ON p.id = pr.property_id
JOIN reservations AS r
ON p.id = r.property_id
JOIN users AS u
ON u.id = r.guest_id
where r.guest_id = 1 and 
r.end_date < now() :: date
GROUP BY p.id,r.id
ORDER BY start_date 
LIMIT 10;
