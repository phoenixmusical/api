'use strict';
const ogs = require('open-graph-scraper');

module.exports = function (req, res, next) {
    if (!req.query.url) {
        throw new Error('Parameter "url" missing');
    }

    const options = {
        url: req.query.url,
        timeout: 6000,
    };
    ogs(options, function (error, result) {
        if (error) {
            next(error);
        } else if (result.success) {
            const meta = {};
            const data = result.data;
            if (data.ogVideo) {
                meta.video = data.ogVideo;
            } else if (data.twitterPlayer) {
                meta.video = data.twitterPlayer;
            }

            if (data.ogImage) {
                meta.image = data.ogImage;
            } else if (data.twitterImage) {
                meta.image = data.twitterImage;
            }

            if (data.ogTitle) {
                meta.title = data.ogTitle;
            } else if (data.twitterTitle) {
                meta.title = data.twitterTitle;
            }

            if (data.ogDescription) {
                meta.description = data.ogDescription;
            } else if (data.twitterDescription) {
                meta.description = data.twitterDescription;
            }

            if (data.ogUrl) {
                meta.url = data.ogUrl;
            } else {
                meta.url = req.query.url;
            }

            res.json({
                meta: meta,
            });
        } else {
            res.json({
                meta: {
                    url: req.query.url,
                },
            });
        }
    });
};
