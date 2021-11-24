INSERT INTO users (id,name, email, password) VALUES (1,'Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (id,name, email, password) VALUES (2,'Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (id,name, email, password) VALUES (3,'Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (id,owner_id, title, description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
 VALUES (1,3,'title', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930.61,6,4,8,'canada','1602 wilson st','Saskatoon', 'SK', 23453, true);
 
 INSERT INTO properties (id,owner_id, title, description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
 VALUES (2,2,'title', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 930.61,6,4,8,'canada','16 Quebec Ave','Calgary', 'AB', 23343, true);
 
 INSERT INTO properties (id,owner_id, title, description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
 VALUES (3,1,'title', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 630.61,3,5,4,'canada','1322 Taylor st','Regina', 'SK', 26753, true);


INSERT INTO reservations (ID,start_date,end_date,property_id,guest_id) VALUES (1, '2018-09-11', '2018-09-26', 2, 3 ), (2, '2019-09-10', '2019-09-25', 3, 2), (3, '2019-08-10', '2019-08-25', 1, 2);


INSERT INTO property_reviews (ID,guest_id,property_id,reservation_id,rating,message) VALUES (1,3,2,1,4,'Messaage'), (2,2,3,2,3,'Messaage'), (3,2,1,3,5,'Messaage');
