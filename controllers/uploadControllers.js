const { resSend } = require("../utils/resSend");
const { query } = require("../db/db.js");
exports.uploadFile = (req, res) => {
  console.log("hello buddy...");
  // Handle Image Upload
  let fileData = {};
  if (req.file) {
    fileData = {
      fileName: req.file.filename,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    };
    console.log("hey i am file data:", req.body.text);
    // console.log("hey i am text data:", req.text);

    resSend(res, true, 200, "file uploaded!", fileData, null);
  } else {
    resSend(res, false, 200, "Please upload a valid image", fileData, null);
  }
};

exports.createContent = async (req, res) => {
  try {
    const { category_id, title, description, url, team } = req.body;
    const file_path = req.file?.filename;
    console.log(
      "hey i am body data:",
      category_id,
      title,
      description,
      url,
      team
    );

    // Basic validation
    if (!category_id || !title || !description || !url || !team || !file_path) {
      return resSend(
        res,
        false,
        400,
        "All fields including image are required",
        null,
        null
      );
    }

    const insertSql = `
        INSERT INTO content 
        (category_id, title, description, url, image_path, team, is_active) 
        VALUES (?, ?, ?, ?, ?, ?, '1')
      `;

    const result = await query({
      query: insertSql,
      values: [category_id, title, description, url, file_path, team],
    });

    if (result.affectedRows > 0) {
      resSend(
        res,
        true,
        201,
        "Content inserted successfully",
        { id: result.insertId },
        null
      );
    } else {
      resSend(res, false, 400, "Failed to insert content", null, null);
    }
  } catch (error) {
    console.error(error);
    resSend(res, false, 500, "Server error", error, null);
  }
};
// exports.updateContent = async (req, res) => {
//   try {
//     const { category_id, title, description, url, team } = req.body;
//     const file_path = req.file?.filename;
//     console.log(
//       "hey i am body data:",
//       category_id,
//       title,
//       description,
//       url,
//       team
//     );

//     // Basic validation
//     if (!category_id || !title || !description || !url || !team || !file_path) {
//       return resSend(
//         res,
//         false,
//         400,
//         "All fields including image are required",
//         null,
//         null
//       );
//     }

//     const insertSql = `
//         INSERT INTO content
//         (category_id, title, description, url, image_path, team, is_active)
//         VALUES (?, ?, ?, ?, ?, ?, '1')
//       `;

//     const result = await query({
//       query: insertSql,
//       values: [category_id, title, description, url, file_path, team],
//     });

//     if (result.affectedRows > 0) {
//       resSend(
//         res,
//         true,
//         201,
//         "Content inserted successfully",
//         { id: result.insertId },
//         null
//       );
//     } else {
//       resSend(res, false, 400, "Failed to insert content", null, null);
//     }
//   } catch (error) {
//     console.error(error);
//     resSend(res, false, 500, "Server error", error, null);
//   }
// };
exports.updateContent = async (req, res) => {
  try {
    const { id, category_id, title, description, url, team } = req.body;
    console.log("hey i am body data:", title, description);
    const file_path = req.file?.filename;

    // Basic validation
    if (!id || !category_id || !title || !description || !url || !team) {
      return resSend(
        res,
        false,
        400,
        "All fields (including ID) are required",
        null,
        null
      );
    }

    let updateSql = `
      UPDATE content SET
        category_id = ?,
        title = ?,
        description = ?,
        url = ?,
        team = ?`;

    const values = [category_id, title, description, url, team];

    if (file_path) {
      updateSql += `, image_path = ?`;
      values.push(file_path);
    }

    updateSql += ` WHERE id = ?`;
    values.push(id);

    const result = await query({
      query: updateSql,
      values,
    });

    if (result.affectedRows > 0) {
      resSend(res, true, 200, "Content updated successfully", null, null);
    } else {
      resSend(res, false, 404, "No content found with this ID", null, null);
    }
  } catch (error) {
    console.error(error);
    resSend(res, false, 500, "Server error", error, null);
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Hey i am body data:", id);
    if (!id) {
      return resSend(res, false, 400, "ID is required", null, null);
    }
    const deleteSql = `UPDATE content SET is_active = '0' WHERE id = ?`;
    const result = await query({
      query: deleteSql,
      values: [id],
    });
    if (result.affectedRows > 0) {
      resSend(res, true, 200, "Content deleted successfully", null, null);
    } else {
      resSend(res, false, 404, "No content found with this ID", null, null);
    }
  } catch (error) {
    console.erroe(error);
    resSend(res, false, 500, "Server error", error, null);
  }
};
