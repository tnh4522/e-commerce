/**
 * seedData.js
 *
 * Self-contained grocery seed data for the Frontend API Resilience Layer.
 * Guarantees that even if all backend APIs and public static fetches are unreachable,
 * the application continues to have complete, realistic, consistent data.
 */

export const INITIAL_CATEGORIES = [
    { id: 1, category: "Rau củ hữu cơ" },
    { id: 2, category: "Bánh mì tươi" },
    { id: 3, category: "Nước ép trái cây" },
    { id: 4, category: "Đồ uống & Sữa" },
    { id: 5, category: "Thịt & Hải sản" },
    { id: 6, category: "Đồ ngọt & Mật ong" },
    { id: 7, category: "Trái cây tươi" }
];

export const INITIAL_BRANDS = [
    { id: 1, brand: "Organic Valley" },
    { id: 2, brand: "Sunstar" },
    { id: 3, brand: "Amber Jar" },
    { id: 4, brand: "Heinz" },
    { id: 5, brand: "Fresh Nature" },
    { id: 6, brand: "Pure Harvest" },
    { id: 7, brand: "Love Corn" }
];

export const INITIAL_USERS = [
    {
        id: 1,
        name: "Quản trị viên FoodMart",
        email: "admin@foodmart.com",
        password: "admin",
        phone: "0901234567",
        address: "123 Hai Bà Trưng, Quận 1, TP. Hồ Chí Minh",
        country: "Việt Nam",
        avatar: "reviewer-1.jpg",
        level: 1
    },
    {
        id: 2,
        name: "Nhà vườn Hữu cơ Đà Lạt",
        email: "seller@foodmart.com",
        password: "seller",
        phone: "0907654321",
        address: "456 Thung Lũng Xanh, TP. Đà Lạt, Lâm Đồng",
        country: "Việt Nam",
        avatar: "reviewer-2.jpg",
        level: 2
    },
    {
        id: 3,
        name: "Nguyễn Thị Mai",
        email: "user@foodmart.com",
        password: "user",
        phone: "0912345678",
        address: "789 Nguyễn Trãi, Thanh Xuân, Hà Nội",
        country: "Việt Nam",
        avatar: "reviewer-3.jpg",
        level: 0
    }
];

export const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: "Cà chua chùm tươi hữu cơ",
        price: 4.5,
        image: '["thumb-tomatoes.png","product-thumb-2.png"]',
        idCategory: 1,
        idBrand: 5,
        idUser: 2,
        companyProfile: "Fresh Nature Farm",
        detail: "Cà chua đỏ hữu cơ mọng nước, giàu lycopene và vitamin C. Được thu hoạch tươi từ nông trại xanh mỗi ngày, thích hợp cho món salad và nấu sốt.",
        status: 1
    },
    {
        id: 2,
        name: "Dưa leo baby hữu cơ",
        price: 3.2,
        image: '["thumb-cucumber.png","thumb-herb.jpg"]',
        idCategory: 1,
        idBrand: 1,
        idUser: 2,
        companyProfile: "Organic Valley",
        detail: "Dưa leo baby hữu cơ giòn ngọt tự nhiên, mọng nước và tươi mát. Hoàn toàn không sử dụng phân bón hóa học hay thuốc trừ sâu.",
        status: 1
    },
    {
        id: 3,
        name: "Hương thảo & Thảo mộc tươi",
        price: 2.8,
        image: '["thumb-herb.jpg","thumb-tomatoes.png"]',
        idCategory: 1,
        idBrand: 5,
        idUser: 2,
        companyProfile: "Fresh Nature Farm",
        detail: "Thảo mộc hương thảo tươi sạch, mang lại hương vị thơm nồng đặc trưng cho các món bít tết, gà nướng và nước sốt âu.",
        status: 1
    },
    {
        id: 4,
        name: "Sốt tương cà Heinz Classic",
        price: 4.2,
        image: '["thumb-tomatoketchup.png","product-thumb-2.png"]',
        idCategory: 1,
        idBrand: 4,
        idUser: 2,
        companyProfile: "Heinz Global",
        detail: "Sốt cà chua Heinz trứ danh làm từ những quả cà chua tươi mọng đỏ chín tự nhiên, vị chua ngọt hài hòa đánh thức mọi giác quan.",
        status: 1
    },
    {
        id: 5,
        name: "Bánh quy bơ giòn xốp",
        price: 5.5,
        image: '["thumb-biscuits.png","product-large-1.jpg"]',
        idCategory: 2,
        idBrand: 2,
        idUser: 2,
        companyProfile: "Sunstar Bakery",
        detail: "Bánh quy bơ giòn xốp nướng vàng ruộm, thơm lừng vị bơ tươi tự nhiên. Món ăn nhẹ tuyệt vời khi thưởng thức cùng trà hoặc sữa nóng.",
        status: 1
    },
    {
        id: 6,
        name: "Bắp nướng muối biển Love Corn",
        price: 4.0,
        image: '["product-large-1.jpg","product-large-2.jpg"]',
        idCategory: 2,
        idBrand: 7,
        idUser: 2,
        companyProfile: "Love Corn Snacks",
        detail: "Hạt bắp thơm ngon được sấy giòn tan với muối biển tự nhiên, ít calo, giàu chất xơ, món snack dinh dưỡng cho người yêu lối sống lành mạnh.",
        status: 1
    },
    {
        id: 7,
        name: "Bắp sấy giòn vị BBQ Love Corn",
        price: 4.5,
        image: '["product-large-2.jpg","product-large-3.jpg"]',
        idCategory: 2,
        idBrand: 7,
        idUser: 2,
        companyProfile: "Love Corn Snacks",
        detail: "Ngô giòn rụm tẩm ướp sốt BBQ hun khói đậm đà, vị ngon bùng nổ, không chứa gluten và 100% nguyên liệu tự nhiên.",
        status: 1
    },
    {
        id: 8,
        name: "Bánh ngũ cốc nướng giòn",
        price: 3.8,
        image: '["product-large-4.jpg","product-large-5.jpg"]',
        idCategory: 2,
        idBrand: 2,
        idUser: 2,
        companyProfile: "Sunstar Bakery",
        detail: "Bánh ngũ cốc nướng giòn tan giàu dinh dưỡng từ lúa mì nguyên cám và yến mạch hữu cơ, cung cấp năng lượng sạch cho ngày dài.",
        status: 1
    },
    {
        id: 9,
        name: "Nước cam tươi nguyên chất 100%",
        price: 5.8,
        image: '["thumb-orange-juice.png","product-thumb-1.png"]',
        idCategory: 3,
        idBrand: 2,
        idUser: 2,
        companyProfile: "Sunstar Beverages",
        detail: "Nước cam vắt nguyên chất 100% tươi mát, không thêm đường và không chất bảo quản, bổ sung vitamin C tự nhiên giúp tăng cường hệ miễn dịch.",
        status: 1
    },
    {
        id: 10,
        name: "Nước ép dưa lưới tươi Sunstar",
        price: 6.5,
        image: '["product-thumb-1.png","thumb-orange-juice.png"]',
        idCategory: 3,
        idBrand: 2,
        idUser: 2,
        companyProfile: "Sunstar Beverages",
        detail: "Nước ép dưa lưới ngọt dịu kết hợp cùng trái cây nhiệt đới tươi mát, mang lại cảm giác sảng khoái tức thì trong những ngày hè oi bức.",
        status: 1
    },
    {
        id: 11,
        name: "Sinh tố trái cây nhiệt đới mùa hè",
        price: 7.2,
        image: '["product-large-3.jpg","thumb-raspberries.png"]',
        idCategory: 3,
        idBrand: 2,
        idUser: 2,
        companyProfile: "Sunstar Beverages",
        detail: "Sinh tố hoa quả nhiệt đới sánh mịn, kết hợp hài hòa giữa dâu rừng, xoài cát và chanh dây tươi, dồi dào chất chống oxy hóa.",
        status: 1
    },
    {
        id: 12,
        name: "Sữa tươi tiệt trùng nguyên kem 100%",
        price: 4.8,
        image: '["thumb-milk.png","product-thumbnail-5.jpg"]',
        idCategory: 4,
        idBrand: 1,
        idUser: 2,
        companyProfile: "Organic Valley Dairy",
        detail: "Sữa bò tươi nguyên kem tiệt trùng 100% từ đồng cỏ hữu cơ, giàu đạm và canxi tự nhiên, vị thanh béo ngậy thơm ngon tuyệt hảo.",
        status: 1
    },
    {
        id: 13,
        name: "Sữa hạt hạnh nhân hữu cơ",
        price: 5.6,
        image: '["thumb-milk.png","thumb-biscuits.png"]',
        idCategory: 4,
        idBrand: 1,
        idUser: 2,
        companyProfile: "Organic Valley Dairy",
        detail: "Sữa thực vật từ hạt hạnh nhân hữu cơ cao cấp, không đường, không lactose, thơm bùi thanh nhẹ tốt cho hệ tim mạch.",
        status: 1
    },
    {
        id: 14,
        name: "Cá ngừ đại dương ngâm dầu ô liu",
        price: 8.9,
        image: '["thumb-tuna.jpg","product-thumbnail-1.jpg"]',
        idCategory: 5,
        idBrand: 6,
        idUser: 2,
        companyProfile: "Pure Harvest Meats",
        detail: "Cá ngừ đại dương đánh bắt tự nhiên, ngâm trong dầu ô liu nguyên chất hảo hạng. Nguồn protein và axit béo Omega-3 dồi dào cho cơ thể.",
        status: 1
    },
    {
        id: 15,
        name: "Phi lê cá ngừ trắng cao cấp",
        price: 9.5,
        image: '["thumb-tuna.jpg","thumb-herb.jpg"]',
        idCategory: 5,
        idBrand: 6,
        idUser: 2,
        companyProfile: "Pure Harvest Meats",
        detail: "Phi lê cá ngừ trắng cắt khúc đặc biệt đóng hộp chuẩn châu Âu, thịt chắc ngọt tự nhiên, giữ trọn hương vị tươi sống từ đại dương.",
        status: 1
    },
    {
        id: 16,
        name: "Mật ong hoa rừng nguyên chất",
        price: 12.5,
        image: '["thumb-honey.jpg","product-thumb-11.jpg"]',
        idCategory: 6,
        idBrand: 3,
        idUser: 2,
        companyProfile: "Amber Jar Co.",
        detail: "Mật ong tự nhiên nguyên chất thu hoạch từ hoa rừng già, màu vàng hổ phách óng ánh, vị ngọt sâu lắng giàu enzyme kháng khuẩn quý giá.",
        status: 1
    },
    {
        id: 17,
        name: "Mật ong hoa tự nhiên Amber Jar",
        price: 14.0,
        image: '["product-thumb-11.jpg","product-thumb-12.jpg"]',
        idCategory: 6,
        idBrand: 3,
        idUser: 2,
        companyProfile: "Amber Jar Co.",
        detail: "Hũ mật ong tự nhiên Amber Jar thượng hạng, chắt lọc tinh hoa từ những mùa hoa rộ nhất, đem lại hương thơm ngát và vị ngọt thanh khiết.",
        status: 1
    },
    {
        id: 18,
        name: "Mật ong hoa dại cao cấp Amber Jar",
        price: 13.5,
        image: '["product-thumb-12.jpg","product-thumb-13.jpg"]',
        idCategory: 6,
        idBrand: 3,
        idUser: 2,
        companyProfile: "Amber Jar Co.",
        detail: "Mật ong hoa dại tự nhiên với hương vị tinh tế, chất mật sánh quyện óng ả, rất thích hợp khi pha trà cam sả hoặc ăn kèm pancake.",
        status: 1
    },
    {
        id: 19,
        name: "Bánh tổ ong nguyên sáp Amber Jar",
        price: 18.0,
        image: '["product-thumb-13.jpg","product-thumb-14.jpg"]',
        idCategory: 6,
        idBrand: 3,
        idUser: 2,
        companyProfile: "Amber Jar Co.",
        detail: "Bánh tổ ong nguyên sáp tự nhiên chứa trọn vẹn mật hoa tươi, sáp ong non và keo ong bổ dưỡng, đem đến trải nghiệm ẩm thực đỉnh cao.",
        status: 1
    },
    {
        id: 20,
        name: "Khoai tây sấy giòn lát mỏng",
        price: 3.6,
        image: '["thumb-junk.jpg","thumb-biscuits.png"]',
        idCategory: 6,
        idBrand: 2,
        idUser: 2,
        companyProfile: "Sunstar Snacks",
        detail: "Khoai tây thái lát mỏng sấy giòn tan rắc muối hồng tự nhiên, thơm bùi quyến rũ, không sử dụng chất phụ gia hay phẩm màu nhân tạo.",
        status: 1
    },
    {
        id: 21,
        name: "Chuối già Nam Mỹ chín tự nhiên",
        price: 3.0,
        image: '["thumb-bananas.png","product-thumbnail-2.jpg"]',
        idCategory: 7,
        idBrand: 5,
        idUser: 2,
        companyProfile: "Fresh Nature Farm",
        detail: "Chuối tiêu vàng Cavendish chín tự nhiên vỏ mỏng ngọt thơm, dồi dào kali, magie và chất xơ, cung cấp năng lượng tức thì cho cơ thể.",
        status: 1
    },
    {
        id: 22,
        name: "Mâm xôi đỏ tươi Đà Lạt",
        price: 7.5,
        image: '["thumb-raspberries.png","product-thumbnail-3.jpg"]',
        idCategory: 7,
        idBrand: 5,
        idUser: 2,
        companyProfile: "Fresh Nature Farm",
        detail: "Những trái mâm xôi hữu cơ đỏ mọng hái tươi từ vườn Đà Lạt, vị chua ngọt hài hòa khó quên, hoàn hảo cho món tráng miệng bổ dưỡng.",
        status: 1
    },
    {
        id: 23,
        name: "Bơ sáp Hass hữu cơ Đà Lạt",
        price: 5.5,
        image: '["thumb-avocado.png","product-thumbnail-4.jpg"]',
        idCategory: 7,
        idBrand: 1,
        idUser: 2,
        companyProfile: "Organic Valley",
        detail: "Bơ sáp hữu cơ giống Hass vỏ sần ruột vàng óng, dẻo quánh béo ngậy tự nhiên, giàu chất béo tốt không bão hòa đơn có lợi cho tim mạch.",
        status: 1
    }
];

export const INITIAL_BLOGS = [
    {
        id: 1,
        title: "Thịt giăm bông nướng mật ong xá xíu thơm lừng đậm đà",
        description: "Năm nay thay vì mua ngoài tiệm đắt đỏ, hãy tự tay làm món thịt giăm bông nướng mật ong xá xíu thơm lừng đậm đà ngay tại gian bếp nhà bạn.",
        content: "Món thịt giăm bông nướng mật ong xá xíu là sự kết hợp tuyệt đỉnh giữa ẩm thực truyền thống phương Tây và phong vị Á Đông đậm đà.<br/><br/>Lớp vỏ mật ong rừng tự nhiên kết hợp cùng sốt xá xíu khi nướng ở nhiệt độ chuẩn sẽ tạo nên một lớp caramel vàng óng, giòn nhẹ bên ngoài nhưng bên trong từng thớ thịt vẫn giữ được độ mềm ẩm và mọng nước.<br/><br/>Hãy sử dụng mật ong nguyên chất Amber Jar và thịt đùi heo tươi sạch để món ăn đạt được hương vị thơm ngon và chuẩn vị nhất nhé!",
        image: "post-thumb-1.jpg",
        createdAt: "2025-06-12",
        updatedAt: "2025-06-15",
        author: "Bếp trưởng Gordon",
        idAuth: 1
    },
    {
        id: 2,
        title: "Bò hầm sốt vang Osso Buco mềm tan chuẩn vị Ý bằng nồi áp suất",
        description: "Công thức nấu bò hầm sốt vang cà chua Osso Buco mềm tan chuẩn vị Ý chỉ với 6 nguyên liệu hữu cơ tươi ngon trong vòng 1 giờ.",
        content: "Osso Buco là món ăn trứ danh của vùng Lombardy, nước Ý. Từng miếng bắp bò có gân và tủy xương béo ngậy được hầm mềm nhừ cùng cà chua đỏ hữu cơ, rượu vang và các loại rau củ củ cần tây, cà rốt tươi.<br/><br/>Bí quyết để món bò hầm này thơm ngát chính là một bó thảo mộc tươi gồm hương thảo (rosemary) và cỏ xạ hương tươi được buộc gọn thả vào nồi hầm.<br/><br/>Thưởng thức cùng một ly nước ép cam tươi hoặc lát bánh mì nướng bơ tỏi giòn rụm sẽ là trải nghiệm ẩm thực ấm áp tuyệt vời cho cả gia đình.",
        image: "post-thumb-2.jpg",
        createdAt: "2025-05-28",
        updatedAt: "2025-05-30",
        author: "Bếp trưởng Mario",
        idAuth: 1
    },
    {
        id: 3,
        title: "Bít tết thăn nội bò áp chảo cùng thảo mộc tươi từ nông trại",
        description: "Thăn bò bít tết hảo hạng kết hợp hoàn hảo cùng khay gia vị thảo mộc tươi tự nhiên và sốt chấm thủ công tinh tế.",
        content: "Thăn nội bò (Beef Tenderloin) là phần thịt mềm nhất, ngọt nhất của chú bò. Khi áp chảo cùng bơ tươi và vài nhánh hương thảo (rosemary) tươi thu hoạch từ vườn rau hữu cơ, hương thơm sẽ ngập tràn căn bếp.<br/><br/>Để giữ được vị ngọt tự nhiên, chỉ cần nêm một chút muối biển và tiêu đen đập dập. Thưởng thức kèm salad dưa leo baby, cà chua chùm đỏ và nước ép sinh tố mát lạnh để cân bằng dinh dưỡng.",
        image: "post-thumb-3.jpg",
        createdAt: "2025-05-15",
        updatedAt: "2025-05-18",
        author: "Bếp FoodMart",
        idAuth: 1
    },
    {
        id: 4,
        title: "Bí quyết làm khoai tây nướng vàng giòn rụm thơm lừng",
        description: "Bí quyết làm khoai tây nướng giòn rụm bên ngoài nhưng bên trong mềm xốp như kem bông chuẩn phong cách ẩm thực Anh Quốc.",
        content: "Khoai tây nướng vàng ươm là món ăn kèm kinh điển cho mọi bữa tiệc thịt nướng. Để khoai có lớp vỏ giòn tan mà ruột vẫn mềm mọng, hãy luộc sơ khoai với một chút muối, lắc nhẹ để tạo lớp tinh bột tơi xốp trên bề mặt trước khi rưới dầu ô liu và đem nướng.<br/><br/>Rắc thêm một chút muối biển và ngò tây thái nhỏ ngay khi khoai vừa ra khỏi lò để cảm nhận trọn vẹn vị bùi béo tự nhiên.",
        image: "post-thumb-1.jpg",
        createdAt: "2025-04-20",
        updatedAt: "2025-04-22",
        author: "Chuyên gia dinh dưỡng Sarah",
        idAuth: 1
    },
    {
        id: 5,
        title: "10 siêu thực phẩm hữu cơ tự nhiên tăng cường hệ miễn dịch",
        description: "Khám phá các loại trái cây tươi, mật ong hoa rừng và rau xanh giàu chất chống oxy hóa tự nhiên giúp nâng cao sức khỏe hàng ngày.",
        content: "Một chế độ ăn uống lành mạnh bắt đầu từ những nguyên liệu sạch và tự nhiên nhất. Các loại quả mọng như mâm xôi (raspberry), dưa leo, bơ tươi và mật ong tự nhiên chứa hàm lượng dồi dào các vitamin A, C, E cũng như chất béo tốt.<br/><br/>Hãy ghé thăm các quầy thực phẩm tươi sống tại FoodMart mỗi ngày để luôn có sẵn nguồn thực phẩm xanh sạch và an toàn cho gia đình bạn!",
        image: "post-thumb-2.jpg",
        createdAt: "2025-04-05",
        updatedAt: "2025-04-08",
        author: "Bác sĩ Emily Green",
        idAuth: 1
    }
];

export const INITIAL_ORDERS = [
    {
        id: 1001,
        orderCode: 1001,
        userId: 3,
        name: "Nguyễn Thị Mai",
        email: "user@foodmart.com",
        phone: "0912345678",
        address: "789 Nguyễn Trãi, Thanh Xuân, Hà Nội",
        description: "VNQR0912345678",
        total: 24.97,
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
        status: "Đang giao hàng",
        paymentMethod: "VNPay QR",
        orderDetails: [
            {
                product: {
                    id: 1,
                    name: "Cà chua chùm tươi hữu cơ",
                    price: 4.5,
                    image: '["thumb-tomatoes.png"]'
                },
                quantity: 2
            },
            {
                product: {
                    id: 23,
                    name: "Bơ sáp Hass hữu cơ Đà Lạt",
                    price: 5.5,
                    image: '["thumb-avocado.png"]'
                },
                quantity: 2
            },
            {
                product: {
                    id: 12,
                    name: "Sữa tươi tiệt trùng nguyên kem 100%",
                    price: 4.8,
                    image: '["thumb-milk.png"]'
                },
                quantity: 1
            }
        ]
    },
    {
        id: 1002,
        orderCode: 1002,
        userId: 3,
        name: "Nguyễn Thị Mai",
        email: "user@foodmart.com",
        phone: "0912345678",
        address: "789 Nguyễn Trãi, Thanh Xuân, Hà Nội",
        description: "VNQR0912345678",
        total: 18.2,
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 5).toLocaleDateString(),
        status: "Đã giao hàng",
        paymentMethod: "Thanh toán khi nhận hàng (COD)",
        orderDetails: [
            {
                product: {
                    id: 9,
                    name: "Nước cam tươi nguyên chất 100%",
                    price: 5.8,
                    image: '["thumb-orange-juice.png"]'
                },
                quantity: 2
            },
            {
                product: {
                    id: 22,
                    name: "Mâm xôi đỏ tươi Đà Lạt",
                    price: 7.5,
                    image: '["thumb-raspberries.png"]'
                },
                quantity: 1
            }
        ]
    }
];
