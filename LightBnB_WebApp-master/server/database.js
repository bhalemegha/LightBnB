const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const selectSql = "SELECT * FROM users WHERE email = $1";
  const values = [email];
   return pool.query(selectSql,values)
              .then((result) => {
                return result.rows[0]})
              .catch((err) => {
                console.log();
              });

  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const selectSql = "SELECT * FROM users WHERE id = $1";
  const values = [id];
  return pool.query(selectSql,values)
              .then((result) => result.rows[0])
              .catch((err) => {
                console.log();
              });

  // return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  const selectSql = "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *;";
  const values = [user.name,user.email,user.password];
  return pool.query(selectSql,values)
              .then((result) => { 
                return result.rows[0] 
              })
              .catch((err) => {
                console.log();
              });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  const selectSql = "SELECT * FROM reservations AS r JOIN users AS u ON u.id = r.guest_id JOIN properties AS p ON p.id = r.property_id JOIN property_reviews AS pr ON pr.reservation_id = r.id WHERE r.guest_id = $1 AND start_date <> current_date AND end_date <> current_date limit $2";
  const values = [guest_id, limit];
  return pool.query(selectSql,values)
              .then((result) => {
                return result.rows
                })
              .catch((err) => {
                console.log();
              });
  
  // return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }

const getAllProperties = function (options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_reviews.property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city iLIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `WHERE properties.owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push((Number(options.minimum_price_per_night))*100);
    queryString += ` AND properties.cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push((Number(options.maximum_price_per_night))*100);
    queryString += ` AND properties.cost_per_night <= $${queryParams.length} `;
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += ` AND property_reviews.rating >= $${queryParams.length} `;
  }


  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);
  return pool.query(queryString, queryParams)
              .then((res) => {
                console.log(res.rows);
                return res.rows;
              });
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const selectSql = `INSERT INTO properties (owner_id, title, 
                description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,
                number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code) values
                ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *;`
  const values = [property.owner_id, property.title, property.description, 
      property.thumbnail_photo_url, property.cover_photo_url,property.cost_per_night, property.parking_spaces,
      property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street,
      property.city, property.province, property.post_code];

  return pool.query(selectSql,values)
              .then((result) => { 
                return result.rows[0] 
              })
              .catch((err) => {
                console.log();
              });
}

exports.addProperty = addProperty;
