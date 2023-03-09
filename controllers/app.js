const App = require("../models/app");
const Point = require("../models/point");
const { ObjectId } = require("mongodb");

const getAppDetails = async (applicationId) => {
  try {
    const app = await App.findOne({
      _id: new ObjectId(applicationId),
      deleted: false,
      enabled: true,
    }).select("_id type name meta.platform");
    if (!app) {
      throw new Error("Application not found!");
    }
    const points = await Point.aggregate([
      {
        $match: {
          applicationId: new ObjectId(applicationId),
          status: "complete",
        },
      },
      { $group: { _id: "$applicationId", totalPoints: { $sum: "$points" } } },
      { $project: { _id: 0, totalPoints: 1 } },
    ]);

    const totalPoints = points.length ? points[0].totalPoints : 0;
    const {
      _id,
      type,
      name,
      meta: { platform },
    } = app;

    return { _id, type, name, platform, totalPoints };
  } catch (error) {
    console.log("error:", error);
    throw new Error(error.message);
  }
};

exports.getApp = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const appDetails = await getAppDetails(applicationId);
    return res.json(appDetails);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

exports.getAllApps = async (req, res) => {
  try {
    const apps = await App.aggregate([
      {
        $match: { deleted: false, enabled: true },
      },
      {
        $lookup: {
          from: "points",
          localField: "_id",
          foreignField: "applicationId",
          as: "points",
        },
      },
      {
        $unwind: "$points",
      },
      {
        $match: { "points.status": "complete" },
      },
      {
        $group: {
          _id: "$_id",
          type: { $first: "$type" },
          name: { $first: "$name" },
          platform: { $first: "$meta.platform" },
          totalPoints: { $sum: "$points.points" },
        },
      },
      {
        $sort: { totalPoints: -1 },
      },
    ]);

    const total = apps.length;
    const currentHourEnd = new Date().setHours(
      new Date().getHours() + 1,
      0,
      0,
      0
    );
    const remaining = Math.floor((currentHourEnd - Date.now()) / (1000 * 60));
    const items = apps.map((app) => ({
      id: app._id,
      type: app.type,
      name: app.name,
      platform: app.platform,
      totalPoints: app.totalPoints,
    }));

    return res.json({
      status: true,
      total,
      remaining,
      items,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ status: false, error: error.message });
  }
};
