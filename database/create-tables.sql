CREATE DATABASE Siraj_Shop;
USE Siraj_Shop;
CREATE TABLE USERS(
    id INT PRIMARY KEY AUTO_INCREMENT,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Date_Of_Birth DATE NOT NULL,
    Email VARCHAR(70) UNIQUE NOT NULL,
    Password VARCHAR(30) NOT NULL
);

CREATE TABLE ITEMS(
	id INT PRIMARY KEY AUTO_INCREMENT,
    Item_Name VARCHAR(100),
    Price DECIMAL(4, 2),
    Sex VARCHAR(10),
    Category VARCHAR(20),
    Image_Pathway VARCHAR(255)
);

-- https://www.amazon.ca/BGOWATU-Shirts-Sleeve-Pocket-Casual/dp/B0C5XM2M8P?ref_=Oct_d_onr_d_10287298011_7&pd_rd_w=Fv1vn&content-id=amzn1.sym.61e66258-eef5-45fe-a8dc-635cc7a35f8b&pf_rd_p=61e66258-eef5-45fe-a8dc-635cc7a35f8b&pf_rd_r=A7ZYBZJN4CQ91HWS9R2R&pd_rd_wg=5jaIN&pd_rd_r=ae3f476a-b3a3-4dae-9998-f1d02e035f60&pd_rd_i=B0C5XM2M8P
INSERT INTO ITEMS (Item_Name, Price, Category, Image_Pathway)
VALUES ('Golf Shirt', 29.99, 'Men', 'shirt', './images/61PSmKgGjrL._AC._SR360,460.jpg');

-- https://www.amazon.ca/Alimens-Gentle-Flannel-Casual-Regular/dp/B07K781XSN/ref=asc_df_B07K781XSN/?tag=googleshopc0c-20&linkCode=df0&hvadid=378206509406&hvpos=&hvnetw=g&hvrand=11891085036715020666&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9000682&hvtargid=pla-834702030913&psc=1
INSERT INTO ITEMS (Item_Name, Price, Category, Image_Pathway)
VALUES ('Casual Shirt', 33.99, 'Men', 'shirt', './images/71RVv3LmNzL._AC_UX569_.jpg');

-- https://www.amazon.ca/Tommy-Hilfiger-Shirt-Regal-Medium/dp/B07CFB6MV6/ref=sr_1_81?qid=1689978474&refinements=p_36%3A5000-&rnid=12035759011&s=fashion&sr=1-81&th=1
INSERT INTO ITEMS (Item_Name, Price, Category, Image_Pathway)
VALUES ('Polo Shirt', 59.99, 'Men', 'shirt', './images/912moz+uMVL._AC_SX679._SX._UX._SY._UY_.jpg');

-- https://www.amazon.ca/COOFANDY-Textured-Designer-Western-Regular/dp/B0953W3FCC/ref=lp_10287298011_1_12
INSERT INTO ITEMS (Item_Name, Price, Category, Image_Pathway)
VALUES ('Linen Shirt', 39.99, 'Men', 'shirt', './images/81RIM50O47L._AC_UX569_.jpg');

-- https://www.amazon.ca/APTRO-Hawaiian-Tropical-Holiday-HW020-Flamingo/dp/B08HZ1SV18/ref=sr_1_44?qid=1689979022&s=fashion&sr=1-44
INSERT INTO ITEMS (Item_Name, Price, Category, Image_Pathway)
VALUES ('Hawaiian Shirts', 33.29, 'Men', 'shirt', './images/81YDJlSKOlL._AC_UX569_.jpg');

-- https://www.amazon.ca/Wrangler-Authentics-Sleeve-Classic-Bright/dp/B01N810106/ref=sr_1_101?qid=1689979167&s=fashion&sr=1-101
INSERT INTO ITEMS (Item_Name, Price, Category, Image_Pathway)
VALUES ('Plaid Shirt', 35.99, 'Men', 'shirt', './images/91jZGdsQujL._AC_UX679_.jpg');

-- https://www.amazon.ca/Signature-Levi-Strauss-Gold-Label/dp/B073V3TQHL?ref_=Oct_d_orecs_d_10287260011_0&pd_rd_w=ATfmC&content-id=amzn1.sym.e9443a82-1e85-46ac-a327-f05a3d24bc0e&pf_rd_p=e9443a82-1e85-46ac-a327-f05a3d24bc0e&pf_rd_r=SMRMB3NK6YZV7NYZFDCK&pd_rd_wg=EaEU8&pd_rd_r=62287175-eb41-4499-862b-4b34eb9acc4c&pd_rd_i=B073V3TQHL
INSERT INTO ITEMS (Item_Name, Price, Category, Image_Pathway)
VALUES ('Levi Jeans', 42.81, 'Men', 'jeans', './images/81sS0a1dgjL._AC_UX569_.jpg');

-- https://www.amazon.ca/Gingtto-Ripped-Repaired-Skinny-Stretch/dp/B076JC3N4V?ref_=Oct_d_orecs_d_10287260011_1&pd_rd_w=ATfmC&content-id=amzn1.sym.e9443a82-1e85-46ac-a327-f05a3d24bc0e&pf_rd_p=e9443a82-1e85-46ac-a327-f05a3d24bc0e&pf_rd_r=SMRMB3NK6YZV7NYZFDCK&pd_rd_wg=EaEU8&pd_rd_r=62287175-eb41-4499-862b-4b34eb9acc4c&pd_rd_i=B076JC3N4V
INSERT INTO ITEMS (Item_Name, Price, Category, Image_Pathway)
VALUES ('Skinny Jeans', 64.86, 'Men', 'jeans', './images/51VVIcQ83DL._AC_UY741_.jpg');

INSERT INTO ITEMS (Item_Name, Price, Category, Image_Pathway)
VALUES ('Wrangler Jeans', 44.39, 'Men', 'jeans', './images/71bxUBa7ysL._AC_UX569_.jpg');