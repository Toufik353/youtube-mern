const Channel = require('../models/channels.model.js');
const User = require('../models/user.model.js');
const mongoose = require('mongoose')

// Create a new channel
const createChannel = async (req, res) => {
  try {
      const { channelName, description, channelBanner, channelHandle } = req.body;
    const userId = req.user.user;
      

    if (!userId) {
      return res.status(403).json({ message: 'User not authenticated' });
    }
    const existingChannel = await Channel.findOne({ owner: userId });
    if (existingChannel) {
      return res.status(400).json({ message: 'You already have a channel' });
    }

    const channel = new Channel({
      channelName,
        owner: userId,
      description,
      channelBanner,
      channelHandle,
    });

      await channel.save();
      
    res.status(201).json(channel);
  } catch (error) {
    console.error("Error creating channel:", error);
    res.status(500).json({ message: 'Error creating channel' });
  }
};


  const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId);

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this channel' });
    }

    const { channelName, description, channelBanner, channelHandle } = req.body;

    channel.channelName = channelName || channel.channelName;
    channel.description = description || channel.description;
    channel.channelBanner = channelBanner || channel.channelBanner;
    channel.channelHandle = channelHandle || channel.channelHandle;

    await channel.save();
    res.json(channel);
  } catch (error) {
    console.error("Error updating channel:", error);
    res.status(500).json({ message: 'Error updating channel' });
  }
};

// Delete a channel (only the owner can delete)
const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId);

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this channel' });
    }

    await channel.remove();
    res.json({ message: 'Channel deleted successfully' });
  } catch (error) {
    console.error("Error deleting channel:", error);
    res.status(500).json({ message: 'Error deleting channel' });
  }
};

const getChannelById = async (req, res) => {
  console.log("Testing from getChannelById");

  try {
      const userId = req.user.user;
    const objectId =new  mongoose.Types.ObjectId(userId);

    const channel = await Channel.findOne({ owner: objectId });


    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    res.json(channel);
  } catch (error) {
    console.error("Error fetching channel data:", error);
    res.status(500).json({ message: 'Error fetching channel data' });
  }

};

module.exports = { createChannel, updateChannel, deleteChannel ,getChannelById};