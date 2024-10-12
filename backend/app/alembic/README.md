Generic single-database configuration.

Tạo thư mục model để quản lý các entity
1. Tạo thư mục model
2. Tạo file entity trong thư mục model. Vd: app/model/product.py
3. Cập nhật file app/alembic/env.py, bổ sung thêm 1 dòng như bên dưới vào trước dòng "target_metadata = [SQLModel.metadata]":
   - from app.model.<entity-file-name> import <entity-name>
   - Example: from app.model.product import Product
4. Để debug trên local có thể cần đổi psycopg3 về psycopg2