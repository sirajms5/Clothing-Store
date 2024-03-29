CREATE TABLE SIRAJ_STORE_USERS(
    id INT PRIMARY KEY AUTO_INCREMENT,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Date_Of_Birth DATE NOT NULL,
    Email VARCHAR(70) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE SIRAJ_STORE_ITEMS(
	id INT PRIMARY KEY AUTO_INCREMENT,
    Item_Name VARCHAR(100),
    Price DECIMAL(4, 2),
    Sex VARCHAR(10),
    Category VARCHAR(20),
    Image_Pathway VARCHAR(255),
    Alt_Text VARCHAR(255)
);

CREATE TABLE SIRAJ_STORE_TRANSACTIONS(
    id INT PRIMARY KEY AUTO_INCREMENT,
    Amount_Paid DECIMAL(8, 2),
    User_Id INT NOT NULL,
    FOREIGN KEY (User_Id) REFERENCES SIRAJ_STORE_USERS(id) ON DELETE CASCADE
);

CREATE TABLE SIRAJ_STORE_CARTS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    User_Id INT NOT NULL,
    Item_Id INT NOT NULL,
    Start_Date DATE NOT NULL,
    End_Date DATE DEFAULT NULL,
    Transaction_Id INT DEFAULT NULL,
    FOREIGN KEY (User_Id) REFERENCES SIRAJ_STORE_USERS(id) ON DELETE CASCADE,
    FOREIGN KEY (Item_Id) REFERENCES SIRAJ_STORE_ITEMS(id) ON DELETE CASCADE,
    FOREIGN KEY (Transaction_Id) REFERENCES SIRAJ_STORE_TRANSACTIONS(id) ON DELETE CASCADE
);

-- https://www.amazon.ca/BGOWATU-Shirts-Sleeve-Pocket-Casual/dp/B0C5XM2M8P?ref_=Oct_d_onr_d_10287298011_7&pd_rd_w=Fv1vn&content-id=amzn1.sym.61e66258-eef5-45fe-a8dc-635cc7a35f8b&pf_rd_p=61e66258-eef5-45fe-a8dc-635cc7a35f8b&pf_rd_r=A7ZYBZJN4CQ91HWS9R2R&pd_rd_wg=5jaIN&pd_rd_r=ae3f476a-b3a3-4dae-9998-f1d02e035f60&pd_rd_i=B0C5XM2M8P
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Golf Shirt', 29.99, 'Men', 'shirt', './images/61PSmKgGjrL._AC._SR360,460.jpg', 'BGOWATU Men Polo Shirts Short Sleeve Golf Shirt with Pocket Dry Fit 1/4 Zip Casual Sports T Shirts');

-- https://www.amazon.ca/Alimens-Gentle-Flannel-Casual-Regular/dp/B07K781XSN/ref=asc_df_B07K781XSN/?tag=googleshopc0c-20&linkCode=df0&hvadid=378206509406&hvpos=&hvnetw=g&hvrand=11891085036715020666&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9000682&hvtargid=pla-834702030913&psc=1
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Casual Shirt', 33.99, 'Men', 'shirt', './images/71RVv3LmNzL._AC_UX569_.jpg', 'Alimens & Gentle Men Casual Button Down Flannel Shirt Plaid');

-- https://www.amazon.ca/Tommy-Hilfiger-Shirt-Regal-Medium/dp/B07CFB6MV6/ref=sr_1_81?qid=1689978474&refinements=p_36%3A5000-&rnid=12035759011&s=fashion&sr=1-81&th=1
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Polo Shirt', 59.99, 'Men', 'shirt', './images/912moz+uMVL._AC_SX679._SX._UX._SY._UY_.jpg', 'Tommy Hilfiger Mens Polo Yellow Shirt');

-- https://www.amazon.ca/COOFANDY-Textured-Designer-Western-Regular/dp/B0953W3FCC/ref=lp_10287298011_1_12
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Linen Shirt', 39.99, 'Men', 'shirt', './images/81RIM50O47L._AC_UX569_.jpg', 'COOFANDY Men Casual Linen Shirt Short Sleeve Button Down Business Dress gray Shirt');

-- https://www.amazon.ca/APTRO-Hawaiian-Tropical-Holiday-HW020-Flamingo/dp/B08HZ1SV18/ref=sr_1_44?qid=1689979022&s=fashion&sr=1-44
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Hawaiian Shirts', 33.29, 'Men', 'shirt', './images/81YDJlSKOlL._AC_UX569_.jpg', 'APTRO Men Hawaiian Shirts Short Sleeve Button Down Casual Beach Tropical Shirts Party Holiday');

-- https://www.amazon.ca/Wrangler-Authentics-Sleeve-Classic-Bright/dp/B01N810106/ref=sr_1_101?qid=1689979167&s=fashion&sr=1-101
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Plaid Shirt', 35.99, 'Men', 'shirt', './images/91jZGdsQujL._AC_UX679_.jpg', 'Wrangler Authentics Mens Short Sleeve Classic Plaid Shirt');

-- https://www.amazon.ca/Signature-Levi-Strauss-Gold-Label/dp/B073V3TQHL?ref_=Oct_d_orecs_d_10287260011_0&pd_rd_w=ATfmC&content-id=amzn1.sym.e9443a82-1e85-46ac-a327-f05a3d24bc0e&pf_rd_p=e9443a82-1e85-46ac-a327-f05a3d24bc0e&pf_rd_r=SMRMB3NK6YZV7NYZFDCK&pd_rd_wg=EaEU8&pd_rd_r=62287175-eb41-4499-862b-4b34eb9acc4c&pd_rd_i=B073V3TQHL
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Levi Jeans', 42.81, 'Men', 'jeans', './images/81sS0a1dgjL._AC_UX569_.jpg', 'Signature by Levi Strauss & Co. Gold Label Mens Relaxed Fit Jeans');

-- https://www.amazon.ca/Gingtto-Ripped-Repaired-Skinny-Stretch/dp/B076JC3N4V?ref_=Oct_d_orecs_d_10287260011_1&pd_rd_w=ATfmC&content-id=amzn1.sym.e9443a82-1e85-46ac-a327-f05a3d24bc0e&pf_rd_p=e9443a82-1e85-46ac-a327-f05a3d24bc0e&pf_rd_r=SMRMB3NK6YZV7NYZFDCK&pd_rd_wg=EaEU8&pd_rd_r=62287175-eb41-4499-862b-4b34eb9acc4c&pd_rd_i=B076JC3N4V
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Skinny Jeans', 64.86, 'Men', 'jeans', './images/51VVIcQ83DL._AC_UY741_.jpg', 'GINGTTO Mens Skinny Jeans Stretch Slim Fit Jean Pants');

-- https://www.amazon.ca/Wrangler-Authentics-Classic-5-Pocket-Twilight/dp/B074KK9K7B?ref_=Oct_d_orecs_d_10287260011_2&pd_rd_w=ATfmC&content-id=amzn1.sym.e9443a82-1e85-46ac-a327-f05a3d24bc0e&pf_rd_p=e9443a82-1e85-46ac-a327-f05a3d24bc0e&pf_rd_r=SMRMB3NK6YZV7NYZFDCK&pd_rd_wg=EaEU8&pd_rd_r=62287175-eb41-4499-862b-4b34eb9acc4c&pd_rd_i=B074KK9K7B
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Wrangler Jeans', 44.39, 'Men', 'jeans', './images/71bxUBa7ysL._AC_UX569_.jpg', 'Wrangler Mens Classic 5-Pocket Regular Fit Flex Jean');

-- https://www.amazon.ca/GoodValue-Running-Waterproof-Non-Slip-All-Terrain/dp/B09YTXKN1R/?_encoding=UTF8&pd_rd_i=B09MYPX8NC&pd_rd_w=QsFvl&content-id=amzn1.sym.a5045f39-0cc2-46cc-8eac-176a9b09d68c&pf_rd_p=a5045f39-0cc2-46cc-8eac-176a9b09d68c&pf_rd_r=J6E5Z493B50P0NK8YJP1&pd_rd_wg=7TRTq&pd_rd_r=5bdd080c-571d-479f-b7b0-4861a911bf2e&ref_=oct_dx_dotd
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Running Shoes', 38.39, 'Men', 'shoes', './images/71hq8jllLlL._AC_UX575_.jpg', 'GoodValue Trail Running Shoes Men Waterproof Walking Hiking Running Shoes for Men Non-Slip All-Terrain Shoes');

-- https://www.amazon.ca/FUJEAK-Breathable-Athletic-Comfortable-Lightweight/dp/B08HWXSK6Q/?_encoding=UTF8&pd_rd_i=B08G4KXPLH&pd_rd_w=QsFvl&content-id=amzn1.sym.a5045f39-0cc2-46cc-8eac-176a9b09d68c&pf_rd_p=a5045f39-0cc2-46cc-8eac-176a9b09d68c&pf_rd_r=J6E5Z493B50P0NK8YJP1&pd_rd_wg=7TRTq&pd_rd_r=5bdd080c-571d-479f-b7b0-4861a911bf2e&ref_=oct_dx_dotd
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Fujeak Shoes', 46.99, 'Men', 'shoes', './images/71R3GjjWMyL._AC_UY575_.jpg', 'FUJEAK Men Walking Shoes Men Casual Breathable Running Shoes Sport Athletic Sneakers Gym Tennis Slip On Comfortable Lightweight Shoes for Jogging');

-- https://www.amazon.ca/RIELD-Military-Tactical-Zipper-Jungle/dp/B087GCXKWZ/?_encoding=UTF8&pd_rd_i=B087G9G48H&pd_rd_w=QsFvl&content-id=amzn1.sym.a5045f39-0cc2-46cc-8eac-176a9b09d68c&pf_rd_p=a5045f39-0cc2-46cc-8eac-176a9b09d68c&pf_rd_r=J6E5Z493B50P0NK8YJP1&pd_rd_wg=7TRTq&pd_rd_r=5bdd080c-571d-479f-b7b0-4861a911bf2e&ref_=oct_dx_dotd&th=1
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Work Boots', 63.99, 'Men', 'shoes', './images/81ToCrQe5gL._AC_SY575._SX._UX._SY._UY_.jpg', 'RIELD Men Military Tactical Work Boots Side Zipper Jungle Army Combat Boots');

-- https://www.amazon.ca/Alex-Vando-Womens-Button-Stretch/dp/B07JVFGXRX/ref=sr_1_3_sspa?qid=1689980102&s=fashion&sr=1-3-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGZfYnJvd3Nl&psc=1
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Dress Shirt', 34.99, 'Women', 'shirt', './images/711DVmlvM1L._AC_UX679_.jpg', 'ALEX VANDO Womens Dress Shirts Regular Fit Long Sleeve Stretch Work Shirt');

-- https://www.amazon.ca/dp/B0BWNBKRNF/ref=sspa_dk_detail_6?psc=1&pd_rd_i=B0BWNBKRNF&pd_rd_w=36EF2&content-id=amzn1.sym.d8c43617-c625-45bd-a63f-ad8715c2c055&pf_rd_p=d8c43617-c625-45bd-a63f-ad8715c2c055&pf_rd_r=FEC7MEDDBV4XFZEJCHBN&pd_rd_wg=ch6Ei&pd_rd_r=cc769ae3-ef3a-4df0-9104-24c808d2a668&s=fashion&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Long Sleeve', 49.99, 'Women', 'shirt', './images/51AJlajii7L._AC_UX679_.jpg', 'GRACE KARIN Womens Peplum Tops Button Down Blouse Long Sleeve Collared Shirts Smocked Back Top');

-- https://www.amazon.ca/dp/B07B3QJNRF/ref=sspa_dk_detail_3?psc=1&pd_rd_i=B07B3QJNRF&pd_rd_w=RcUxd&content-id=amzn1.sym.d8c43617-c625-45bd-a63f-ad8715c2c055&pf_rd_p=d8c43617-c625-45bd-a63f-ad8715c2c055&pf_rd_r=B5E5DKH3VY6HWF0Z1NXQ&pd_rd_wg=wEEYU&pd_rd_r=43419656-b086-4c87-ba35-d22526448250&s=fashion&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('EZEN Shirt', 30.62, 'Women', 'shirt', './images/714dww+R8sL._AC_UX569_.jpg', 'EZEN Womens Women Button Down Blue Shirts');

-- https://www.amazon.ca/dp/B0B6J49ZHN/ref=sspa_dk_detail_7?psc=1&pd_rd_i=B0B6J49ZHN&pd_rd_w=ESAq5&content-id=amzn1.sym.d8c43617-c625-45bd-a63f-ad8715c2c055&pf_rd_p=d8c43617-c625-45bd-a63f-ad8715c2c055&pf_rd_r=S98RBKQS9VGRQRPDV0FD&pd_rd_wg=GCYNR&pd_rd_r=f49cb4bc-a9bb-49ab-936e-061fdbca5be6&s=fashion&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Dress Shirt', 36.99, 'Women', 'shirt', './images/71OGjHpQQGL._AC_UX569_.jpg', 'Luranee Women 3/4 Roll Sleeve Blue Shirt Notch V Neck Flowy Plaid Tunic Blouses');

-- https://www.amazon.ca/dp/B0B96V6CK8/ref=sspa_dk_detail_7?psc=1&pd_rd_i=B0B96V6CK8&pd_rd_w=YWjvT&content-id=amzn1.sym.d8c43617-c625-45bd-a63f-ad8715c2c055&pf_rd_p=d8c43617-c625-45bd-a63f-ad8715c2c055&pf_rd_r=0XN78BVXWK346B4J0VY9&pd_rd_wg=Pc7su&pd_rd_r=37df9607-0101-49c9-ba6f-43883ce1d972&s=fashion&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Loose Blouse', 21.99, 'Women', 'shirt', './images/813RrNyE0TL._AC_UX569_.jpg', 'Tanst Sky Womens Ruffle 3/4 Sleeve Layered Mesh Blouses Loose Fit Flowy Tunic Tops');

-- https://www.amazon.ca/dp/B0B747PH59/ref=sspa_dk_detail_11?psc=1&pf_rd_p=14f07b63-de09-4b1a-8753-fdcce0125efd&pf_rd_r=1CM3TNBYJ9EZTZ40EYAA&pd_rd_wg=JC4aX&pd_rd_w=VURyp&content-id=amzn1.sym.14f07b63-de09-4b1a-8753-fdcce0125efd&pd_rd_r=ba5e6028-a7e0-4634-aeac-8c9a6f7318be&s=fashion&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzNEJHRFBKQlpPUDM4JmVuY3J5cHRlZElkPUEwNjg1MDU4V0NXQ1BUNVNNU1ZQJmVuY3J5cHRlZEFkSWQ9QTA5MjUxNzYxUzUzOEdaUDA5QVdBJndpZGdldE5hbWU9c3BfZGV0YWlsX3RoZW1hdGljJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Viracy Blouse', 34.99, 'Women', 'shirt', './images/71kHpnRY22L._AC_UX569_.jpg', 'Viracy Womens Overlap Ruffle Sleeve V Neck Mesh Blouse Elastic Loose Flowy Tunic Tops');

-- https://www.amazon.ca/Oprah-Favorite-Jeans-Wide-Leg/dp/B0C9JVNG1C?ref_=Oct_d_onr_d_10287512011_2&pd_rd_w=0ISOa&content-id=amzn1.sym.61e66258-eef5-45fe-a8dc-635cc7a35f8b&pf_rd_p=61e66258-eef5-45fe-a8dc-635cc7a35f8b&pf_rd_r=KQKDFW85V5E8BVDND1H0&pd_rd_wg=nP4st&pd_rd_r=1f5752cd-c387-4955-b1e9-2a477d6c5ba6&pd_rd_i=B0C9JVNG1C
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Oprah Jeans', 47.72, 'Women', 'jeans', './images/61bmJ7TX8eL._AC_UX679_.jpg', 'Oprah Favorite Jeans Wide Leg Jeans - Women Seamed Front Wide Leg Jeans Elastic Wide Leg Denim Pants Plus Size');

-- https://www.amazon.ca/TKMUNY-Lace-up-Stretchy-Juniors-Leggings/dp/B0C4T1B25S?ref_=Oct_d_onr_d_10287512011_4&pd_rd_w=0ISOa&content-id=amzn1.sym.61e66258-eef5-45fe-a8dc-635cc7a35f8b&pf_rd_p=61e66258-eef5-45fe-a8dc-635cc7a35f8b&pf_rd_r=KQKDFW85V5E8BVDND1H0&pd_rd_wg=nP4st&pd_rd_r=1f5752cd-c387-4955-b1e9-2a477d6c5ba6&pd_rd_i=B0C4T1B25S
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Tkmuny Jeans', 43.49, 'Women', 'jeans', './images/416M8ND1Q6L._AC_UY741_.jpg', 'TKMUNY Women Lace-up Bell Bottom Denim Pants Mid Waist Stretchy Flare Juniors Jeans Trouser Leggings');

-- https://www.amazon.ca/Womens-Elastic-Distressed-Pants-Trousers/dp/B0C5MYJ1CS?ref_=Oct_d_onr_d_10287512011_5&pd_rd_w=0ISOa&content-id=amzn1.sym.61e66258-eef5-45fe-a8dc-635cc7a35f8b&pf_rd_p=61e66258-eef5-45fe-a8dc-635cc7a35f8b&pf_rd_r=KQKDFW85V5E8BVDND1H0&pd_rd_wg=nP4st&pd_rd_r=1f5752cd-c387-4955-b1e9-2a477d6c5ba6&pd_rd_i=B0C5MYJ1CS
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Casual Jeans', 16.99, 'Women', 'jeans', './images/61RwWH3ifxL._AC_UX679_.jpg', 'Women Elastic High Waist Jeans Women Casual Distressed Flared Denim Pants Comfy Wide Leg Button Up Jean Trousers');

-- https://www.amazon.ca/FRSHANIAH-Athletic-Walking-Non-Slip-Sneakers/dp/B093VJHJF1/ref=sr_1_22_sspa?qid=1689981199&s=fashion&sr=1-22-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGZfYnJvd3Nl&psc=1
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Athletic Shoes', 66.93, 'Women', 'shoes', './images/81eROaqmBS._AC_SY575._SX._UX._SY._UY_.jpg', 'FRSHANIAH Women Athletic Red Shoe Walking Running Shoes Non-Slip Fashion Sneakers');

-- https://www.amazon.ca/dp/B09BCLDDCD/?_encoding=UTF8&pd_rd_i=B09BCMCKV2&pd_rd_w=I0tQ3&content-id=amzn1.sym.6ff60254-e724-49de-b28a-ef9e4fa611a5&pf_rd_p=6ff60254-e724-49de-b28a-ef9e4fa611a5&pf_rd_r=H8BPCCB642PSGXKJ0J3H&pd_rd_wg=avyro&pd_rd_r=18a094f9-e4e1-40e1-9581-391b2580f6b7&ref_=oct_dx_ld
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Tennis Shoes', 52.99, 'Women', 'shoes', './images/71odtnnA9PL._AC_UY575_.jpg', 'Feethit Womens Walking Shoes Lightweight Running Tennis Shoes Non Slip Comfortable Fashion Sneakers');

-- https://www.amazon.ca/dp/B098T8HTKN/?_encoding=UTF8&pd_rd_i=B098T8HTKN&pd_rd_w=I0tQ3&content-id=amzn1.sym.6ff60254-e724-49de-b28a-ef9e4fa611a5&pf_rd_p=6ff60254-e724-49de-b28a-ef9e4fa611a5&pf_rd_r=H8BPCCB642PSGXKJ0J3H&pd_rd_wg=avyro&pd_rd_r=18a094f9-e4e1-40e1-9581-391b2580f6b7&ref_=oct_dx_ld
INSERT INTO SIRAJ_STORE_ITEMS (Item_Name, Price, Sex, Category, Image_Pathway, Alt_Text)
VALUES ('Rain Boots', 39.98, 'Women', 'shoes', './images/51Ak3477zlL._AC_UY575_.jpg', 'GoodValue Womens Rain Boots Waterproof Ankle Boots Womens Lightweight Chelsea Boots Elastic Garden Shoes Short Booties Ladies Slip On Walking Boots');



