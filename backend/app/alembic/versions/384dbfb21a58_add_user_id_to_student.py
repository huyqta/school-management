"""Add user_id to student

Revision ID: 384dbfb21a58
Revises: 13225a7e788a
Create Date: 2024-11-12 07:02:56.101262

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '384dbfb21a58'
down_revision = '13225a7e788a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('student', sa.Column('user_id', sa.Uuid(), nullable=False))
    op.create_foreign_key(None, 'student', 'user', ['user_id'], ['id'])
    op.drop_column('student', 'firstname')
    op.drop_column('student', 'email')
    op.drop_column('student', 'lastname')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('student', sa.Column('lastname', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.add_column('student', sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.add_column('student', sa.Column('firstname', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'student', type_='foreignkey')
    op.drop_column('student', 'user_id')
    # ### end Alembic commands ###