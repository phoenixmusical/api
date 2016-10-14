'use strict';
const db = require('../../db');
const createModel = require('./createModel');
const password = require('./password');

class Model {
    constructor (data) {
        Object.assign(this, data);
    }
}

class StandardModel extends Model {
    findAddedBy () {
        return db('user')
            .where({ id: this.added_by })
            .first()
            .then(user => new exports.User(user));
    }
}

exports.User = createModel('user', class User extends Model {
    findCommittees () {
        return db('committee')
            .innerJoin('committee_member', 'committee_member.committee_id', 'committee.id')
            .where({ 'committee_member.user_id': this.id })
            .select('committee.*')
            .then(committees => committees.map(committee => new exports.Committee(committee)));
    }

    setPassword (pass) {
        return password.hash(pass)
            .then(passwordHash => {
                this.password_hash = passwordHash;
                return this.save();
            });
    }

    comparePassword (pass) {
        return password.compare(pass, this.password_hash);
    }
});

exports.Committee = createModel('committee', class Committee extends StandardModel {
    findMembers () {
        return db('user')
            .innerJoin('committee_member', 'committee_member.user_id', 'user.id')
            .where({ 'committee_member.committee_id': this.id })
            .select('user.*')
            .then(users => users.map(user => new exports.User(user)));
    }

    findPosts () {
        return db('post')
            .where({ committee_id: this.id })
            .select()
            .then(posts => posts.map(post => new exports.Post(post)));
    }

    findEvents () {
        return db('event')
            .where({ committee_id: this.id })
            .select()
            .then(events => events.map(event => new exports.Event(event)));
    }
});

const Event = exports.Event = createModel('event', class Event extends StandardModel {
    findCommittee () {
        return db('committee')
            .where({ id: this.committee_id })
            .first()
            .then(committee => new exports.Committee(committee));
    }
});

Event.findByRange = function (startDate, endDate) {
    const query = db('event');
    if (startDate) {
        query.where('start_date', '>=', startDate);
    }

    if (endDate) {
        query.where('start_date', '<', endDate);
    }

    return query.select()
        .then(events => events.map(event => new Event(event)));
};

exports.Post = createModel('post', class Post extends StandardModel {
    findCommittee () {
        return db('committee')
            .where({ id: this.committee_id })
            .first()
            .then(committee => new exports.Committee(committee));
    }

    findMessages () {
        return db('message')
            .where({ post_id: this.id })
            .select()
            .then(messages => messages.map(message => new exports.Message(message)));
    }

    addMessage (content, addedBy) {
        const now = new Date();
        return db('message').insert({
            post_id: this.id,
            content: content,
            added_on: now,
            updated_on: now,
            added_by: addedBy,
        });
    }
});

exports.Message = createModel('message', class Message extends StandardModel {});
