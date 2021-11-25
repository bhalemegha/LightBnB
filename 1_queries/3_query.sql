SELECT p.title, AVG(pr.rating) AS average_rating
FROM property_reviews AS pr
JOIN properties AS p
ON p.id = pr.property_id
WHERE city = 'Vancouver' AND pr.rating >= 4
GROUP BY p.id
ORDER BY p.cost_per_night
