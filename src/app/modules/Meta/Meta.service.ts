import { USER_ROLE } from "../user/user.constant";

const fetchDashboardMetaData = async (user: any) => {
  let metaData;

  switch (user?.role) {
    case USER_ROLE.admin:
      metaData = getSuperAdminMetaData();
      break;
    case USER_ROLE.seller:
      metaData = getAdminMetaData();
      break;
    case USER_ROLE.buyer:
      metaData = getUserMetaData(user);
      break;
    default:
      throw new Error("Invalid user role!");
  }

  return metaData;
};

const getSuperAdminMetaData = async () => {
  const userCount = "";
  const petCount = "";
  const adoptionCount = "";
  const blogCount = "";

  const totalRevenue ="";

  const barChartData = await getBarChartData();
  const pieCharData = await getPieChartData();

  return {
    userCount,
    petCount,
    adoptionCount,
    blogCount,
    totalRevenue,
    barChartData,
    pieCharData,
  };
};

const getAdminMetaData = async () => {
  const adminCount = "";
  const userCount = "";
  const petCount = "";
  const popularPetCount = "";
  const adoptionCount = "";
  const blogCount ="";
  const donationCount = "";

  const totalRevenue = "";

  const barChartData = await getBarChartData();
  const pieCharData = await getPieChartData();

  return {
    userCount,
    adminCount,
    petCount,
    popularPetCount,
    adoptionCount,
    blogCount,
    donationCount,
    totalRevenue,
    barChartData,
    pieCharData,
  };
};

const getUserMetaData = async (user: any) => {
//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: user?.email,
//     },
//   });

//   const petCount = await prisma.pet.count({
//     where: {
//       userId: userData.id,
//     },
//   });

//   const adoptionCount = await prisma.adoptionRequest.count({
//     where: {
//       userId: userData.id,
//     },
//   });

//   const blogCount = await prisma.blog.count({
//     where: {
//       userId: userData.id,
//     },
//   });

//   const donationCount = await prisma.donation.count({
//     where: {
//       userId: userData.id,
//     },
//   });

//   return {
//     petCount,
//     adoptionCount,
//     blogCount,
//     donationCount,
//   };
};

const getBarChartData = async () => {
//   const adoptionCountByMonth: { month: Date; count: bigint }[] =
//     await prisma.$queryRaw`
//         SELECT DATE_TRUNC('month', "createdAt") AS month,
//         CAST(COUNT(*) AS INTEGER) AS count
//         FROM "adoptionrequests"
//         GROUP BY month
//         ORDER BY month ASC
//     `;

//   return adoptionCountByMonth;
};

const getPieChartData = async () => {
//   const adoptionStatusDistribution = await prisma.adoptionRequest.groupBy({
//     by: ["status"],
//     _count: { id: true },
//   });

//   const formattedAdoptStatusDistribution =
//   adoptionStatusDistribution.map(({ status, _count }) => ({
//       status,
//       count: Number(_count.id),
//     }));

//   return formattedAdoptStatusDistribution;
};

export const MetaService = {
  fetchDashboardMetaData,
};
