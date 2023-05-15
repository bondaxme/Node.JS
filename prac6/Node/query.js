const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'node',
    password: 'apik6144',
    port: 5432,
});

async function runQueries() {
    await client.connect();

    const query1 = `
    SELECT users.id AS user_id, users.name AS user_name, users.avatar_url AS user_avatar,
           channels.photo_url AS channel_photo, channels.description AS channel_description, channels.created_at AS channel_creation_date
    FROM users
    INNER JOIN channels ON users.id = channels.user_id
    ORDER BY channels.created_at DESC
    `;
    const result1 = await client.query(query1);
    console.table(result1.rows);

    const query2 = `
    SELECT videos.id AS video_id, videos.title AS video_title, videos.published_at AS video_publish_date, COUNT(likes.*) AS likes_count
    FROM videos
    INNER JOIN likes ON videos.id = likes.video_id
    WHERE likes.positive = true
    GROUP BY videos.id, videos.title, videos.published_at
    ORDER BY likes_count DESC
    LIMIT 5;
    `;
    const result2 = await client.query(query2);
    console.table(result2.rows);

    const query3 = `
    SELECT videos.id as video_id, videos.title as video_title, videos.preview_url as video_preview,
       videos.duration as video_duration, videos.published_at as video_publish_date
    FROM videos
    INNER JOIN channels ON videos.channel_id = channels.id
    INNER JOIN subscriptions ON channels.id = subscriptions.channel_id
    INNER JOIN users ON subscriptions.user_id = users.id
    WHERE users.name = 'Stephanie Bulger'
    ORDER BY videos.published_at DESC
    `;
    const result3 = await client.query(query3);
    console.table(result3.rows);
    
    const query4 = `
    SELECT channels.id AS channel_id, channels.description AS channel_description, channels.photo_url AS channel_photo_url,
         COUNT(subscriptions.id) AS subscriber_count
    FROM channels
    JOIN subscriptions ON channels.id = subscriptions.channel_id
    WHERE channels.id = '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76'
    GROUP BY channels.id, channels.description, channels.photo_url;
    `;
    const result4 = await client.query(query4);
    console.table(result4.rows);

    const query5 = `
    SELECT videos.id AS video_id, videos.title AS video_title, videos.published_at AS video_publish_date,
       COUNT(likes.video_id) AS like_count
    FROM videos
    INNER JOIN likes ON videos.id = likes.video_id
    WHERE videos.published_at >= '2021-09-01'
    GROUP BY videos.id, videos.title, videos.published_at
    HAVING COUNT(likes.video_id) >  4
    ORDER BY like_count DESC
    LIMIT 10;
    `;
    const result5 = await client.query(query5);
    console.table(result5.rows);

    const query6 = `
    SELECT users.name AS owner_name, users.avatar_url AS user_avatar, channels.photo_url as channel_photo, channels.description as channel_description,
       subscriptions.level AS sub_level, subscriptions.subscribed_at AS last_subscribed_at
    FROM channels
    JOIN users ON channels.user_id = users.id
    JOIN subscriptions ON channels.id = subscriptions.channel_id
    WHERE subscriptions.user_id = (
    SELECT id FROM users WHERE name = 'Ennis Haestier'
    )
    ORDER BY
    CASE subscriptions.level
        WHEN 'vip' THEN 1
        WHEN 'follower' THEN 2
        WHEN 'fan' THEN 3
        ELSE 4
    END,
    subscriptions.subscribed_at DESC;
    `;
    const result6 = await client.query(query6);
    console.table(result6.rows);

    await client.end();
}

runQueries();





