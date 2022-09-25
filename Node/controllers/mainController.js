const userSchema = require("../schemas/userSchema");
const sendRes = require("../modules/sendRes");
const bcrypt = require("bcrypt");
const otherUsers = [
  {
    name: "John",
    img: "https://i.pinimg.com/originals/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg",
    age: "22",
    city: "San Francisco",
    gender: "Male",
    like: null,
  },
  {
    name: "Jonas",
    img: "https://findicons.com/files/icons/61/dragon_soft/256/user.png",
    age: "26",
    city: "Vilnius",
    gender: "Male",
    like: null,
  },
  {
    name: "Petras",
    img: "https://ps.w.org/restrict-user-access/assets/icon-256x256.png?rev=1815922",
    age: "52",
    city: "Kaunas",
    gender: "Male",
    like: null,
  },
  {
    name: "Jane",
    img: "https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/6222481c0ad8761618b18e7e_profile-picture.jpg",
    age: "25",
    city: "L.A.",
    gender: "female",
    like: null,
  },
  {
    name: "Krity",
    img: "https://i.stack.imgur.com/9Evvf.png?s=192&g=1",
    age: "22",
    city: "Miami",
    gender: "female",
    like: null,
  },
  {
    name: "Juste",
    img: "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-flat-user-pattern-round-image_1200090.jpg",
    age: "25",
    city: "Klaipeda",
    gender: "female",
    like: null,
  },
  {
    name: "Gintare",
    img: "https://p.kindpng.com/picc/s/24-248442_female-user-avatar-woman-profile-member-user-profile.png",
    age: "27",
    city: "Panevezis",
    gender: "female",
    like: null,
  },
  {
    name: "Anna",
    img: "https://cdn.pixabay.com/photo/2021/02/12/07/03/icon-6007530_960_720.png",
    age: "33",
    city: "Gdansk",
    gender: "female",
    like: true,
  },
  {
    name: "Arunas",
    img: "https://st2.depositphotos.com/1104517/11965/v/950/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
    age: "43",
    city: "Radviliskis",
    gender: "male",
    like: true,
  },
  {
    name: "Arturas",
    img: "https://img.favpng.com/25/7/23/computer-icons-user-profile-avatar-image-png-favpng-LFqDyLRhe3PBXM0sx2LufsGFU.jpg",
    age: "61",
    city: "Lazdijai",
    gender: "male",
    like: true,
  },
  {
    name: "Inga",
    img: "https://i0.wp.com/newdoorfiji.com/wp-content/uploads/2018/03/profile-img-1.jpg?ssl=1",
    age: "33",
    city: "Kaunas",
    gender: "female",
    like: true,
  },
  {
    name: "Courtney",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv3mnHoFit6HIrxNNdJWvjjz4H2wbn2tCzsA&usqp=CAU",
    age: "22",
    city: "London",
    gender: "female",
    like: true,
  },
  {
    name: "Margaret",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxcm87rrL03spsFCtTjy_9eBGkQWWo0tD8lg&usqp=CAU",
    age: "37",
    city: "Berlin",
    gender: "female",
    like: true,
  },
];

module.exports = {
  getlikedUsers: (req, res) => res.json(likedUsers),
  likedUsers: async (req, res) => {
    likedUsers(req.body);
    await likedUsers.save();

    sendRes(res, "all good", false);
  },

  otherUsers: (req, res) => res.json(otherUsers),

  updatePic: async (req, res) => {
    const user = await user.findById(req.user._id);

    user.picture = req.body.picture;

    const updatedUser = await user.save();

    sendRes(res, "pic good", false);
  },
  register: async (req, res) => {
    const { username, passOne, city, gender, age, picture } = req.body;

    const password = await bcrypt.hash(passOne, 10);

    const user = new userSchema({
      username,
      password,
      city,
      gender,
      age,
      picture,
    });

    await user.save();

    sendRes(res, "registration ok", false);
  },
  login: async (req, res) => {
    const { username, password } = req.body;

    const user = await userSchema.findOne({ username });

    if (!user) return sendRes(res, "user not found by username", true);

    const compare = await bcrypt.compare(password, user.password);
    console.log(compare);

    if (!compare) return sendRes(res, "bad password", true);

    req.session.user = user;

    return sendRes(res, "login is ok", false, { user });
  },
  autoLogin: async (req, res) => {
    if (req.session.user) {
      const { username } = req.session.user;
      const user = await userSchema.findOne({ username });

      return sendRes(res, "login is ok", false, { user });
    }

    sendRes(res, "no user session", true, null);
  },
  logout: async (req, res) => {
    delete req.session.user;
    sendRes(res, "session removed", false, null);
  },
};
