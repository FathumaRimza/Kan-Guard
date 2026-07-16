import Child from "../models/childModel.js";

// Add Child
export const addChild = async (req, res) => {
  try {
    const child = await Child.create({
      ...req.body,
      parent: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Child added successfully",
      child,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Children
export const getChildren = async(req,res)=>{

try{

let children;


if(req.user.role === "Parent"){

    children = await Child.find({
        parent:req.user._id
    })
    .populate("parent","fullName email");

}
else{

    // SchoolAdmin, Police, Teacher can view all children

    children = await Child.find()
    .populate("parent","fullName email");

}


res.status(200).json({

success:true,
children

});


}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};

// Get One Child
export const getChild = async (req, res) => {
  try {
    const child = await Child.findById(req.params.id);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    res.status(200).json({
      success: true,
      child,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Child
export const updateChild = async (req, res) => {
  try {
    const child = await Child.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Child updated successfully",
      child,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Child
export const deleteChild = async (req, res) => {
  try {
    const child = await Child.findByIdAndDelete(req.params.id);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Child deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};